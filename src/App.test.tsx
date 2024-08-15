import { it } from 'vitest'
import App from './App'
import { render, screen } from "@testing-library/react"
//import userEvent from "@testing-library/user-event"

describe("Simple working test", () => {
    it('the title is visible', () => {
        render(<App />)
        expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument()
    })
})