import { it } from 'vitest'
import Register from './Register'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

/**
 * Test for the Welcome Banner visibility in the Register Component. 
 */
describe("Welcome Banner", () => {
    it('should be visible', () => {
        render(<Register />)
        const headerElement = screen.getByText(/Welcome to RevConnect!/i);
        expect(headerElement).toBeInTheDocument(); 
    })
})

/**
 * Test for the Register Banner visibility in the Register Component. 
 */
describe("Register Banner", () => {
    it('should be visible', () => {
        render(<Register />)
        const headerElement = screen.getByText(/Register Here!/i);
        expect(headerElement).toBeInTheDocument(); 
    })
})

/**
 * Test for the Username field visibility in the Register Component. 
 */
describe("Username field", () => {
    it('should be visible', () => {
        render(<Register />)
        const usernameField = screen.getByText(/Username:/i); 
        expect(usernameField).toBeInTheDocument(); 
    })
})

/**
 * Test for the Email field visibility in the Register Component. 
 */
describe("Email field", () => {
    it('should be visible', () => {
        render(<Register />)
        const emailField = screen.getByText(/Email:/i); 
        expect(emailField).toBeInTheDocument(); 
    })
})

/**
 * Test for the Confirm Password field visibility in the Register Component. 
 */
describe("Confirm Password Field", () => {
    it('the Confirm Password field is visible', () => {
        render(<Register />)
        const confirmPasswordField = screen.getByText(/Confirm Password:/i);
        expect(confirmPasswordField).toBeInTheDocument(); 
    })
})

/**
 * Test for the First Name field visibility in the Register Component. 
 */
describe("First Name Field", () => {
    it('should be visible', () => {
        render(<Register />)
        const firstNameField = screen.getByText(/First Name:/i); 
        expect(firstNameField).toBeInTheDocument(); 
    })
})

/**
 * Test for the Last Name field visibility in the Register Component. 
 */
describe("Last Name Field", () => {
    it('should be visible', () => {
        render(<Register />)
        const lastNameField = screen.getByText(/Last Name:/i); 
        expect(lastNameField).toBeInTheDocument(); 
    })
})

/**
 * Test for the Business Account field visibility in the Register Component. 
 */
describe("Business Account Field", () => {
    it('should be visible', () => {
        render(<Register />)
        const businessAccountField = screen.getByText(/Business Account:/i); 
        expect(businessAccountField).toBeInTheDocument(); 
    })
})

/**
 * Test for the Register button visibility in the Register Component. 
 */
describe("Register Button", () => {
    it('should be visible', () => {
        render(<Register />)
        const registerButton = screen.getByRole('button', { name: /Register/i }); 
        expect(registerButton).toBeVisible; 
    })
})

/**
 * Test for the Username input field in the Register component.
 */
describe("Username Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);
        const usernameInputField = screen.getByLabelText("Username:"); 
        await userEvent.type(usernameInputField, "testusername"); 
        expect(usernameInputField).toHaveValue("testusername");
    })
})

/**
 * Test for the Email input field in the Register component.
 */
describe("Email Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);
        const emailInputField = screen.getByLabelText("Email:"); 
        await userEvent.type(emailInputField, "test@gmail.com"); 
        expect(emailInputField).toHaveValue("test@gmail.com");
    })
})

/**
 * Test for the Password input field in the Register component.
 */
describe("Password Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);
        const passwordInputField = screen.getByLabelText("Password:"); 
        await userEvent.type(passwordInputField, "password"); 
        expect(passwordInputField).toHaveValue("password");
    })
})

/**
 * Test for the Confirm Password input field in the Register component.
 */
describe("Confirm Password Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);
        const confirmPasswordInputField = screen.getByLabelText("Confirm Password:"); 
        await userEvent.type(confirmPasswordInputField, "password"); 
        expect(confirmPasswordInputField).toHaveValue("password");
    })
})

/**
 * Test for the First Name input field in the Register component.
 */
describe("First Name Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);
        const firstNameInputField = screen.getByLabelText("First Name:"); 
        await userEvent.type(firstNameInputField, "Kyojuro"); 
        expect(firstNameInputField).toHaveValue("Kyojuro");
    })
})

/**
 * Test for the Last Name input field in the Register component.
 */
describe("Last Name Input Field Test", () => {
    it("should allow text input", async () => {
        render(<Register />);
        const lastNameInputField = screen.getByLabelText("Last Name:"); 
        await userEvent.type(lastNameInputField, "Rengoku"); 
        expect(lastNameInputField).toHaveValue("Rengoku");
    })
})

/**
 * Test for the Business Account Checkbox in the Register component.
 */
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
