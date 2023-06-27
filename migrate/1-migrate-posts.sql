CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;

alter table 
  posts 
ADD COLUMN
  user_address citext;

update posts set user_address = (select eth_address from users where id=posts.user_id);

ALTER TABLE posts ADD CONSTRAINT user_address_format CHECK (user_address ~ $$^0x[a-fA-F0-9]{40}\Z$$);

delete from posts where user_address is null;

ALTER TABLE posts ALTER COLUMN user_address SET NOT NULL;