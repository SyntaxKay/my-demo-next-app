'use client';

interface Props {
    error: Error;
}

const ErrorPage = ({error}: Props) => {
  return (
    <div>
      Unexped error occurred: {error.message}
    </div>
  )
}

export default ErrorPage
