alter table 
  posts 
ADD COLUMN
  public boolean default true;

update posts set public = (select public from users where id=posts.user_id);
