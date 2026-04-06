-- Migration: 091_api_key_multi_group
-- Add group_ids and allowed_models columns to api_keys table
-- for multi-group binding and model-based routing.

ALTER TABLE api_keys
    ADD COLUMN IF NOT EXISTS group_ids jsonb DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS allowed_models jsonb DEFAULT '[]'::jsonb;

COMMENT ON COLUMN api_keys.group_ids IS 'Bound Group ID list for multi-group routing; empty means use group_id or default';
COMMENT ON COLUMN api_keys.allowed_models IS 'Allowed model patterns (supports wildcards like claude-*); empty means no restriction';
