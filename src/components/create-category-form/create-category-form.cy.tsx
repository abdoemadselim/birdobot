import CreateCategoryForm from '@/components/create-category-form'

describe('Create Category Modal', () => {
    beforeEach(() => {
        cy.mount(<CreateCategoryForm />)
    })

    describe('When name field is empty', () => {
        it('should show validation error message', () => {
            cy.get("input[name='name']").clear()
            cy.get("button[data-testid='create-category-button']").click()
            cy.get("p[data-testid='name-error-message']").should('have.text', 'Category name is required.')
        })
    })

    describe('When name field includes characters other than letters, numbers, or _', () => {
        it('should show validation error message', () => {
            cy.get("input[name='name']").clear().type("John Doe")
            cy.get("button[data-testid='create-category-button").click()
            cy.get("p[data-testid='name-error-message']").should('have.text', "Category name can only contain letters, numbers, or '_'")
        })
    })

    describe("When no channel is selected", () => {
        it('should show validation error message', () => {
            // Click on the first channel to unselect it as it is selected by default
            cy.get("button[data-testid='channel']").first().click()
            cy.get("button[data-testid='create-category-button']").click()
            cy.get("p[data-testid='channels-error-message']").should('have.text', 'At least one channel is required')
        })
    })

    describe('When all fields are valid', () => {
        it('should create a new category', () => {
            cy.get("input[name='name']").type("Test_Category")
            cy.get("button[data-testid='color']").first().click()
            cy.get("button[data-testid='emoji']").first().click()
            cy.get("button[data-testid='channel']").first().click().click()
            cy.get("button[data-testid='create-category-button']").click()

            cy.get("div[data-testid='event-categories-list']").should('have.length', 1)
        })
    })
})