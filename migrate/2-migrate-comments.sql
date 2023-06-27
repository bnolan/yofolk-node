alter table 
  comments
ADD COLUMN
  user_address citext;

update comments set user_address = (select eth_address from users where id=comments.user_id);

ALTER TABLE comments ADD CONSTRAINT user_address_format_c CHECK (user_address ~ $$^0x[a-fA-F0-9]{40}\Z$$);

ALTER TABLE comments ALTER COLUMN user_address SET NOT NULL;