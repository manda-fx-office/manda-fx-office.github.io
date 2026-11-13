-- TRANSITION SYSTEM community data model (test only)
-- Run only after provisioning a persistent PostgreSQL database.
CREATE TABLE IF NOT EXISTS community_members (
  id UUID PRIMARY KEY,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member','admin')),
  suspended_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES community_members(id),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 150),
  body TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 20000),
  image_key TEXT,
  image_mime TEXT CHECK (image_mime IN ('image/jpeg','image/png','image/webp')),
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published','deleted')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES community_members(id)
);
CREATE INDEX IF NOT EXISTS community_posts_feed_idx
  ON community_posts (created_at DESC, id DESC) WHERE status = 'published';
CREATE TABLE IF NOT EXISTS community_moderation_log (
  id UUID PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES community_posts(id),
  moderator_id UUID NOT NULL REFERENCES community_members(id),
  action TEXT NOT NULL CHECK (action IN ('delete','restore')),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- IMPORTANT: API must enforce authenticated identity and admin role on the server.
-- Do not expose database credentials or image-storage write keys to browsers.
