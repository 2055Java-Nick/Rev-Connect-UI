import { it } from 'vitest'
import App from './App'
import { render, screen } from "@testing-library/react"
//import userEvent from "@testing-library/user-event"

describe("Simple working test", () => {
    it('the welcome banner is visible', () => {
        render(<App />)
        
        const headerElement = screen.getByText(/Welcome to RevConnect!/i); 

        expect(headerElement).toBeInTheDocument(); 
    })
})

describe("Simple working test 2", () => {
    it('the register banner is visible', () => {
        render(<App />)
        
        const headerElement = screen.getByText(/Register Here!/i); 

        expect(headerElement).toBeInTheDocument(); 
    })
})

