export const Author = (props: any) => {
  let { author, users } = props

  if (users[author]) {
    return users[author]
  } else {
    return author.slice(0,4) + '..' + author.slice(-4)
  }
}
