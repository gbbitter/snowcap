-- Supabase SQL Schema voor ski data
-- Run dit in je Supabase SQL Editor

-- Create snow_data table
CREATE TABLE IF NOT EXISTS snow_data (
    id BIGSERIAL PRIMARY KEY,
    resort TEXT NOT NULL UNIQUE,
    snow_depth INTEGER,
    open_lifts INTEGER,
    total_lifts INTEGER,
    last_snowfall TEXT,
    last_snowfall_amount NUMERIC,
    condition TEXT,
    source TEXT,
    scraped_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_snow_data_resort ON snow_data(resort);
CREATE INDEX IF NOT EXISTS idx_snow_data_updated ON snow_data(updated_at);

-- Enable Row Level Security (RLS)
ALTER TABLE snow_data ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON snow_data
    FOR SELECT
    TO public
    USING (true);

-- Create policy to allow service role insert/update
CREATE POLICY "Allow service role full access" ON snow_data
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Insert initial data (optional)
INSERT INTO snow_data (resort, snow_depth, open_lifts, total_lifts, condition, source) VALUES
    ('Bergeralm', 0, 0, 5, 'Unknown', 'manual'),
    ('Ladurns', 0, 0, 4, 'Unknown', 'manual'),
    ('Superdévoluy', 0, 0, 16, 'Unknown', 'manual')
ON CONFLICT (resort) DO NOTHING;

-- Create a function to clean old data (optional)
CREATE OR REPLACE FUNCTION clean_old_snow_data()
RETURNS void AS $$
BEGIN
    DELETE FROM snow_data
    WHERE updated_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON TABLE snow_data IS 'Stores scraped snow and lift data from ski resorts';
COMMENT ON COLUMN snow_data.resort IS 'Name of the ski resort';
COMMENT ON COLUMN snow_data.snow_depth IS 'Snow depth in centimeters';
COMMENT ON COLUMN snow_data.open_lifts IS 'Number of open lifts';
COMMENT ON COLUMN snow_data.total_lifts IS 'Total number of lifts';
COMMENT ON COLUMN snow_data.source IS 'Data source (bergfex, sneeuwhoogte.nl, etc)';
