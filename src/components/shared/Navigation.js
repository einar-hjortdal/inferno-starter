export default function Navigation () {
  return (
    <div>
      <header>
        header
      </header>
      {this.props.children}
      <footer>
        footer
      </footer>
    </div>
  )
}
