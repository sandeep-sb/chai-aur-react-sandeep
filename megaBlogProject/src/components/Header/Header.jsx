import React, {useState} from "react";
import {useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {Container, LogoutBtn, Logo} from "../index"

export const Header = () => {
    // const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/allposts",
            active: !authStatus
        },
        {
            name: "Add Post",
            slug: "/addpost",
            active: !authStatus
        },
    ]
    return(
        <header>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        {/* <Link to="/"> */}
                            <Logo />
                        {/* </Link> */}
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) => 
                        item.active ? (
                            <li key={item.name}>
                                <button
                                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                    // onClick={navigate(item.slug)}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                        )}
                        {authStatus && 
                        <li>
                            <LogoutBtn />
                        </li>}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}