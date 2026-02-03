// snow-data-scraper.js
// Dit script scraped actuele sneeuwdata van bergfex en sneeuwhoogte.nl
// Run dit dagelijks via cron job of Vercel cron

import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

// Supabase setup - VERVANG MET JOUW CREDENTIALS
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const RESORTS = [
    {
        name: 'Bergeralm',
        bergfexUrl: 'https://www.bergfex.com/bergeralm/',
        bergfexId: 'bergeralm'
    },
    {
        name: 'Ladurns',
        bergfexUrl: 'https://www.bergfex.com/ladurns-gossensass-pflerschtal/',
        bergfexId: 'ladurns-gossensass-pflerschtal'
    },
    {
        name: 'Superdévoluy',
        bergfexUrl: 'https://www.bergfex.com/superDevoluy/',
        bergfexId: 'superDevoluy'
    }
];

async function scrapeBergfex(resort) {
    try {
        const response = await fetch(resort.bergfexUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const html = await response.text();
        const $ = cheerio.load(html);
        
        // Bergfex HTML parsing - DIT KAN VERANDEREN!
        const snowDepthValley = parseInt($('.snow-valley .value').text()) || 0;
        const snowDepthMountain = parseInt($('.snow-mountain .value').text()) || 0;
        const snowDepth = Math.max(snowDepthValley, snowDepthMountain);
        
        const openLifts = parseInt($('.lifts-open').text().match(/\d+/)?.[0]) || null;
        const totalLifts = parseInt($('.lifts-total').text().match(/\d+/)?.[0]) || null;
        
        const lastSnowfall = $('.last-snowfall .date').text() || null;
        const lastSnowfallAmount = parseInt($('.last-snowfall .amount').text()) || 0;
        
        return {
            resort: resort.name,
            snowDepth,
            openLifts,
            totalLifts,
            lastSnowfall,
            lastSnowfallAmount,
            source: 'bergfex',
            scrapedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error(`Error scraping ${resort.name}:`, error);
        return null;
    }
}

async function scrapeSneeuwhoogte(resortName) {
    try {
        // Sneeuwhoogte.nl gebruikt andere URLs per gebied
        const urls = {
            'Bergeralm': 'https://www.sneeuwhoogte.nl/oostenrijk/tirol/steinach-am-brenner/bergeralm',
            'Ladurns': 'https://www.sneeuwhoogte.nl/italie/zuid-tirol/ladurns',
            'Superdévoluy': 'https://www.sneeuwhoogte.nl/frankrijk/devoluy/superdevoluy'
        };
        
        const url = urls[resortName];
        if (!url) return null;
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const html = await response.text();
        const $ = cheerio.load(html);
        
        // Sneeuwhoogte.nl parsing
        const snowDepth = parseInt($('.snow-depth-value').text()) || 0;
        const condition = $('.snow-condition').text().trim() || '';
        
        return {
            resort: resortName,
            snowDepth,
            condition,
            source: 'sneeuwhoogte.nl',
            scrapedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error(`Error scraping sneeuwhoogte.nl for ${resortName}:`, error);
        return null;
    }
}

async function saveToSupabase(data) {
    try {
        const { error } = await supabase
            .from('snow_data')
            .upsert({
                resort: data.resort,
                snow_depth: data.snowDepth,
                open_lifts: data.openLifts,
                total_lifts: data.totalLifts,
                last_snowfall: data.lastSnowfall,
                last_snowfall_amount: data.lastSnowfallAmount,
                condition: data.condition,
                source: data.source,
                scraped_at: data.scrapedAt,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'resort'
            });
        
        if (error) throw error;
        console.log(`✅ Saved ${data.resort} to Supabase`);
    } catch (error) {
        console.error(`❌ Error saving to Supabase:`, error);
    }
}

async function main() {
    console.log('🔄 Starting snow data scraper...');
    
    for (const resort of RESORTS) {
        console.log(`\n📊 Scraping ${resort.name}...`);
        
        // Try bergfex first
        const bergfexData = await scrapeBergfex(resort);
        if (bergfexData) {
            await saveToSupabase(bergfexData);
        }
        
        // Also try sneeuwhoogte.nl for comparison
        const sneeuwhoogteData = await scrapeSneeuwhoogte(resort.name);
        if (sneeuwhoogteData) {
            // Save as secondary source
            await saveToSupabase(sneeuwhoogteData);
        }
        
        // Wait 2 seconds between requests to be polite
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('\n✅ Scraping complete!');
}

// Run the scraper
main();

// Export for Vercel cron
export default main;
