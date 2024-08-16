import { it } from 'vitest'
import Register from './Register'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
//import userEvent from "@testing-library/user-event"

describe("Simple working test", () => {
    it('the welcome banner is visible', () => {
        render(<Register />)
        
        const headerElement = screen.getByText(/Welcome to RevConnect!/i); 

        expect(headerElement).toBeInTheDocument(); 
    })
})

describe("Simple working test 2", () => {
    it('the register banner is visible', () => {
        render(<Register />)
        
        const headerElement = screen.getByText(/Register Here!/i); 

        expect(headerElement).toBeInTheDocument(); 
    })
})

describe("Simple working test 3", () => {
    it('the Username field is visible', () => {
        render(<Register />)
        
        const usernameField = screen.getByText(/Username:/i); 

        expect(usernameField).toBeInTheDocument(); 
    })
})

describe("Simple working test 4", () => {
    it('the Email field is visible', () => {
        render(<Register />)
        
        const emailField = screen.getByText(/Email:/i); 

        expect(emailField).toBeInTheDocument(); 
    })
})

describe("Simple working test 5", () => {
    it('the Confirm Password field is visible', () => {
        render(<Register />)
        
        const confirmPasswordField = screen.getByText(/Confirm Password:/i); 

        expect(confirmPasswordField).toBeInTheDocument(); 
    })
})

describe("Simple working test 6", () => {
    it('the First Name field is visible', () => {
        render(<Register />)
        
        const firstNameField = screen.getByText(/First Name:/i); 

        expect(firstNameField).toBeInTheDocument(); 
    })
})

describe("Simple working test 6", () => {
    it('the Last Name field is visible', () => {
        render(<Register />)
        
        const lastNameField = screen.getByText(/Last Name:/i); 

        expect(lastNameField).toBeInTheDocument(); 
    })
})

describe("Simple working test 7", () => {
    it('the Business Account field is visible', () => {
        render(<Register />)
        
        const businessAccountField = screen.getByText(/Business Account:/i); 

        expect(businessAccountField).toBeInTheDocument(); 
    })
})

describe("Simple working test 8", () => {
    it('the Register button is visible', () => {
        render(<Register />)
        
        const registerButton = screen.getByRole('button', { name: /Register/i }); 

        expect(registerButton).toBeVisible; 
    })
})

describe("Username Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);

        const usernameInputField = screen.getByLabelText("Username:"); 

        await userEvent.type(usernameInputField, "testusername"); 

        expect(usernameInputField).toHaveValue("testusername");
    })
})

describe("Email Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);

        const emailInputField = screen.getByLabelText("Email:"); 

        await userEvent.type(emailInputField, "test@gmail.com"); 

        expect(emailInputField).toHaveValue("test@gmail.com");
    })
})

describe("Password Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);

        const passwordInputField = screen.getByLabelText("Password:"); 

        await userEvent.type(passwordInputField, "password"); 

        expect(passwordInputField).toHaveValue("password");
    })
})

describe("Confirm Password Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);

        const confirmPasswordInputField = screen.getByLabelText("Confirm Password:"); 

        await userEvent.type(confirmPasswordInputField, "password"); 

        expect(confirmPasswordInputField).toHaveValue("password");
    })
})

describe("First Name Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);

        const firstNameInputField = screen.getByLabelText("First Name:"); 

        await userEvent.type(firstNameInputField, "Kyojuro"); 

        expect(firstNameInputField).toHaveValue("Kyojuro");
    })
})

describe("Last Name Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);

        const lastNameInputField = screen.getByLabelText("Last Name:"); 

        await userEvent.type(lastNameInputField, "Rengoku"); 

        expect(lastNameInputField).toHaveValue("Rengoku");
    })
})

describe("Business Account Checkbox", () => {
    it("should by clickable and toggle state", async () => {
        render(<Register />); 

        const businessAccountCheckbox = screen.getByLabelText("Business Account:"); 

        expect(businessAccountCheckbox).not.toBeChecked(); 

        await userEvent.click(businessAccountCheckbox); 

        expect(businessAccountCheckbox).toBeChecked(); 

        await userEvent.click(businessAccountCheckbox); 

        expect(businessAccountCheckbox).not.toBeChecked(); 
    })
})
