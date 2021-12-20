import React, { FunctionComponent } from 'react'
import { FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa'

const Footer: FunctionComponent = () => {
    return (
        <div className="container mx-auto px-4 flex justify-between items-center h-12 mt-14 px-7">
            <p className="hidden md:block">Copyright Ren0503 &copy 2021</p>
            <p className="block md:hidden">Ren0503 &copy</p>
            <div className="flex items-center gap-3">
                <p className="hidden md:block">Contact me: </p>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/Ren0503/factory.git"
                >
                    <FaGithub size={25} />
                </a>
                <a
                    className="hover:text-[#1877f2] transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/elchemist0503"
                >
                    <FaFacebook size={25} />
                </a>
                <a
                    className="hover:text-[#5a65ea] transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/elchemist0503"
                >
                    <FaTwitter size={25} />
                </a>
            </div>
        </div>
    )
}

export default Footer
