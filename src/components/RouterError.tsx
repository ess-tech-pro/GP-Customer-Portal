import { useRouteError } from "react-router"

const RouterError = () => {
  const error = useRouteError()

  if (!error) return ''
  return <div className="flex fixed w-full h-full left-0 top-0 justify-center items-center text-[32px] font-extrabold">404 Not Found</div>
}

export default RouterError
