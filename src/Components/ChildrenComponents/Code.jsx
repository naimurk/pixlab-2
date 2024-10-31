import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { css } from '@codemirror/lang-css';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';
import { wast } from '@codemirror/lang-wast';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { rust } from '@codemirror/lang-rust';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { androidstudio } from '@uiw/codemirror-theme-androidstudio';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import { material } from '@uiw/codemirror-theme-material';
import { abcdef } from '@uiw/codemirror-theme-abcdef';
import { aura } from '@uiw/codemirror-theme-aura';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { nord } from '@uiw/codemirror-theme-nord';
import { tomorrowNightBlue } from '@uiw/codemirror-theme-tomorrow-night-blue';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';



const LANGUAGES = {
    javascript: [javascript({ jsx: true })],
    html: [html()],
    python: [python()],
    java: [java()],
    css: [css()],
    cpp: [cpp()],
    json: [json()],
    markdown: [markdown()],
    rust: [rust()],
    sql: [sql()],
    xml: [xml()],
    wast: [wast()],
    php: [php()],
    // Add more languages and their extensions here
};

const Id = ({ item, handleCodeChange, index }) => {
    return (
        <>
            <CodeMirror
                value={
                    item.code
                }
                theme={
                    item.codetheme == "okaidia" ? okaidia :
                        item.codetheme == "androidstudio" ? androidstudio :
                            item.codetheme == "atomone" ? atomone :
                                item.codetheme == "darcula" ? darcula :
                                    item.codetheme == "sublime" ? sublime :
                                        item.codetheme == "tokyoNight" ? tokyoNight :
                                            item.codetheme == "tokyoNightStorm" ? tokyoNightStorm :
                                                item.codetheme == "material" ? material :
                                                    item.codetheme == "dracula" ? dracula :
                                                        item.codetheme == "githubDark" ? githubDark :
                                                            item.codetheme == "githubLight" ? githubLight :
                                                                item.codetheme == "nord" ? nord :
                                                                    item.codetheme == "aura" ? aura :
                                                                        item.codetheme == "abcdef" ? abcdef :
                                                                            item.codetheme == "tomorrowNightBlue" ? tomorrowNightBlue :
                                                                                item.codetheme == "vscodeDark" ? vscodeDark : githubDark
                }



                extensions={LANGUAGES[item.lang] || []}
                basicSetup={{
                    lineNumbers: item.lineNo,
                    foldGutter: false,
                    indentOnInput: true

                }}
                onChange={(e) => handleCodeChange(e, item, index)}

                style={{
                    borderRadius: item.frame !== "macOS-Dark" && item.frame !== "macOS-Light" && item.frame !== "macOS-black" && item.frame !== "macOS-white" ? `${item.br}px` : "",
                    border:
                        item.frame === "photograph" ? "8px solid white" :
                            item.frame === "arc-dark" ? "6px solid rgb(0,0,0,0.5)" :
                                item.frame === "arc-light" ? "6px solid rgb(255,255,255,0.5)" :
                                    item.frame !== "none" && item.frame !== "macOS-Dark" && item.frame !== "macOS-Light" && item.frame !== "macOS-black" && item.frame !== "macOS-white" ? `5px solid ${item.frame}`
                                        : "none",
                    borderBottom: item.frame === "photograph" ? "24px solid white" : "",

                    overflow: "hidden",
                }}
            />


        </>
    )
}

export default Id

