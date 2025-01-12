describe("Dashboard", () => {
  beforeEach(() => {
    // Iniciar sesión antes de cada prueba
    cy.visit("/auth/login");
    cy.get('input[formcontrolname="email"]').type("usuario@ejemplo.com");
    cy.get('input[formcontrolname="password"]').type("contraseña123");
    cy.get('button[type="submit"]').click();
  });

  it("Debe mostrar los tableros existentes", () => {
    cy.url().should("include", "/dashboard");
    cy.contains("Bienvenido al Dashboard");
  });

  it("Debe permitir crear un nuevo tablero", () => {
    cy.contains("Agregar Tablero").click();
    cy.contains("Tablero 1").should("be.visible");
  });
});
