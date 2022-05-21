import { BrowserRouter } from "react-router-dom"
import { QueryParamProvider } from "use-query-params"

export const RouterDecorator = (Story) => {
    return (
        <BrowserRouter>
            <QueryParamProvider>
                <Story />
            </QueryParamProvider>
        </BrowserRouter>
    )
}