import React, { useState } from "react";
import * as styles from './Autocomplete.module.css'
import { EmailDomains } from "../assets/emailList";

function Autocomplete() {
    const [email, setEmail] = useState('')
    const [matches, setMatches] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleOnChange = ({ target: { value } }) => {
        setEmail(value)
        if (!value.includes('@')) {
            setMatches([])
            return
        }
        const [mailName, mailDomain] = value.split('@')
        if (!mailName) return
        const mailDomainReg = new RegExp(mailDomain)
        const bestMatches = EmailDomains.filter(value => {
            return mailDomainReg.test(value)
        })
        setMatches(bestMatches)
        setShowSuggestions(bestMatches.length > 0)
    }

    const onSelectSuggestion = (v) => {
        setEmail(value => value + v.target.innerText)
        setShowSuggestions(false)
    }

    return <div className={styles.container}>
        <input
            autoCapitalize="off"
            autoComplete="off"
            spellCheck="off"
            value={email}
            onChange={handleOnChange}
            type="text"
            pattern=".+@.+"
            placeholder="Enter email address" />
        {showSuggestions && <div
            className={styles.suggestioncontainer}
            onClick={onSelectSuggestion}>
            {matches.map(v => <div data-id={v}>{v}</div>)}
        </div>
        }
    </div >
}

export default Autocomplete