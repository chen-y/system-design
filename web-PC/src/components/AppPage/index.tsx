const AppPage = (props: React.PropsWithChildren<{}>) => {
  const { children } = props
  return <div className="p-6">{children}</div>
}

export default AppPage
