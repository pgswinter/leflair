/* eslint-disable no-useless-escape */
export const textareaErrorText = 'Text need longer than 3 character' 
export const textareaRegex = /^.{3,}$/
export const numberErrorText = 'Allow only number' 
export const numberErrorRegex = /^[0-9]*$/
export const phoneErrorText = 'Phone is not valid' 
export const phoneErrorRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
export const emailErrorText = 'Email is not valid' 
export const emailErrorRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gm