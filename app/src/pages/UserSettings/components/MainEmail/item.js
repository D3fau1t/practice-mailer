import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

const Item = (suggestion, { query, isHighlighted }) => {

    const matches = match(suggestion.email, query)
    const parts = parse(suggestion.email, matches)

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, i) => (
                <span key={i} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                    {part.text}
                </span>
                ))}
            </div>
        </MenuItem>
    )
}

export default Item
