import { Link, NavLink } from "react-router"

const NAVBAR_ITEMS = [
    {
        href: "/",
        title: "Home",
    },
    {
        href: "/characters",
        title: "Personagens",
    },

]

export const NavBar = () => {
    return <div className="flex justify-center items-center p-2 bg-card backdrop-blur-3xl">
        <nav className="hidden items-center gap-6 md:flex">
            {NAVBAR_ITEMS.map((link, idx) => (
                <NavLink
                    key={idx}
                    to={link.href}
                    className={({ isActive }) =>
                        `relative text-sm after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] ${isActive
                            ? "text-primary after:scale-x-100 after:bg-primary font-semibold"
                            : "text-foreground after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-foreground"
                        }`
                    }
                >
                    {link.title}
                </NavLink>
            ))}
        </nav>
    </div>
}

export default NavBar