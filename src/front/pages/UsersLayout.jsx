import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { UsersNavbar } from "../components/UsersNavbar"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const UsersLayout = () => {
    return (
        <ScrollToTop>
            <UsersNavbar />
                <Outlet />
        </ScrollToTop>
    )
}