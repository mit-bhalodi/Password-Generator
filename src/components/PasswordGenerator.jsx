import React, { useState } from "react"
import {
    lowerCaseChars,
    numberChars,
    specialChars,
    upperCaseChars,
} from "../utils/Constants"
import { FaCopy } from "react-icons/fa"
import TextScramble from "./TextScramble"
import { Bounce, toast } from "react-toastify"
import { toastAnimation } from "../utils/Animations"

const PasswordGenerator = () => {
    const [passwordLength, setPasswordLength] = useState(8)
    const [includeUpperCase, setIncludeUpperCase] = useState(true)
    const [includeLowerCase, setIncludeLowerCase] = useState(false)
    const [includeNumbers, setIncludeNumbers] = useState(false)
    const [includeSpecialChars, setIncludeSpecialChars] = useState(false)
    const [generatedPassword, setGeneratedPassword] =
        useState("Generated Password")

    const scramblePass = (fx, el) => {
        fx.setText(el?.innerText || "").then(() => {
            setTimeout(() => {
                scramblePass
            }, 800)
        })
    }

    const generatePassword = () => {
        /* Adding all the types as per selected checkbox */
        let charSet = ""
        if (includeUpperCase) charSet += upperCaseChars
        if (includeLowerCase) charSet += lowerCaseChars
        if (includeNumbers) charSet += numberChars
        if (includeSpecialChars) charSet += specialChars

        let password = ""
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length)
            password += charSet[randomIndex]
        }
        if (
            !includeUpperCase &&
            !includeLowerCase &&
            !includeNumbers &&
            !includeSpecialChars
        ) {
            toast("Please select atleast one checkbox", toastAnimation)
            return
        } else if (passwordLength <= 0) {
            toast("Really! password of zero length?", toastAnimation)
            return
        } else if (passwordLength > 64) {
            toast("Max 64 length is allowed", toastAnimation)
        } else {
            let el = document.querySelector(".output-password")
            el.innerText = password
            setGeneratedPassword(password)
            const fx = new TextScramble(el)
            scramblePass(fx, el)
        }
    }

    const copyPassword = () => {
        navigator.clipboard.writeText(generatedPassword)
        toast("Password Copied to Clipboard", toastAnimation)
    }

    return (
        <React.Fragment>
            <div className="h-full w-full flex flex-1 flex-col justify-center items-center">
                <div className="box border border-black flex flex-col w-[280px] lg:w-[380px] 2xl:w-[480px]">
                    {/* Header */}
                    <div className="header p-4 flex flex-row items-center justify-center gap-4 ">
                        <p className="text-base lg:text-xl font-semibold">
                            % _generaTe paSSword %
                        </p>
                    </div>

                    {/* Output */}
                    <div className="p-4 xl:p-6 border-t border-black flex flex-row justify-between items-center gap-2 lg:gap-4">
                        <p className="text-gray-500 text-sm lg:text-base output-password break-all">
                            {generatedPassword}
                        </p>
                        <FaCopy
                            className="text-base lg:text-xl cursor-pointer"
                            onClick={copyPassword}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col gap-4 border-t border-black">
                        <div className="flex flex-row justify-between items-center">
                            <label className="text-sm lg:text-base">
                                Length of Password:{" "}
                            </label>
                            <input
                                className="w-20 text-right"
                                type="number"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={passwordLength}
                                onChange={(e) =>
                                    setPasswordLength(
                                        parseInt(e.target.value || 0)
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <label className="text-sm lg:text-base">
                                Include Uppercase:{" "}
                            </label>
                            <input
                                className="w-10"
                                type="checkbox"
                                checked={includeUpperCase}
                                onChange={(e) =>
                                    setIncludeUpperCase(e.target.checked)
                                }
                            />
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <label className="text-sm lg:text-base">
                                Include Lowercase:{" "}
                            </label>
                            <input
                                className="w-10"
                                type="checkbox"
                                checked={includeLowerCase}
                                onChange={(e) =>
                                    setIncludeLowerCase(e.target.checked)
                                }
                            />
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <label className="text-sm lg:text-base">
                                Include Numbers:{" "}
                            </label>
                            <input
                                className="w-10"
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={(e) =>
                                    setIncludeNumbers(e.target.checked)
                                }
                            />
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <label className="text-sm lg:text-base">
                                Include Special Characters:{" "}
                            </label>
                            <input
                                className="w-10"
                                type="checkbox"
                                checked={includeSpecialChars}
                                onChange={(e) =>
                                    setIncludeSpecialChars(e.target.checked)
                                }
                            />
                        </div>
                    </div>
                </div>
                {/* Button action */}
                <button
                    className="px-4 py-2 lg:px-6 lg:py-4 text-base text-white bg-black mt-2 w-[280px] lg:w-[380px] 2xl:w-[480px] active:scale-95 duration-150"
                    onClick={generatePassword}
                >
                    Generate
                </button>
            </div>
        </React.Fragment>
    )
}

export default PasswordGenerator
