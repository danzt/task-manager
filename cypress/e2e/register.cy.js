describe("Register Page", () => {
  it("Debe permitir registrar un nuevo usuario", () => {
    cy.visit("/auth/register");

    // Forzamos la interacción con los campos
    cy.get('input[formcontrolname="username"]').type("NuevoUsuario", {
      force: true,
    });
    cy.get('input[formcontrolname="email"]').type("nuevo@ejemplo.com", {
      force: true,
    });
    cy.get('input[formcontrolname="password"]').type("contraseña123", {
      force: true,
    });
    cy.get('input[formcontrolname="confirmPassword"]').type("contraseña123", {
      force: true,
    });

    // Enviar el formulario
    cy.get('button[type="submit"]').click();

    // Verifica redirección al login
    cy.url().should("include", "/auth/login");
    cy.contains("Iniciar Sesión");
  });
});
