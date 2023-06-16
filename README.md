#### Documentación del Repositorio
Este repositorio contiene el código y los archivos necesarios para el pipeline de desarrollo, pruebas, despliegue y monitoreo de la aplicación. A continuación se detalla cómo funciona cada uno de estos procesos y cómo se ejecutan las pruebas, despliegues y notificaciones.

### Pipeline de CI
El pipeline de CI (Integración Continua) se ejecuta automáticamente cuando ocurre un evento de tipo pull request o de tipo push en el repositorio. Su objetivo es construir y probar la aplicación para garantizar la integridad del código. A continuación se explica el flujo de trabajo del pipeline de CI:

Se detecta un evento de pull request o push en el repositorio.
Se inicia el pipeline de CI.
Se realiza la construcción de la aplicación.
Se ejecutan las pruebas utilizando react-scripts y Jest.
Se generan informes de pruebas y cobertura.

### Despliegue de Pruebas
El despliegue de pruebas se realiza mediante un evento workflow dispatch que recibe como entrada una pull request específica. Este despliegue se realiza en AWS, donde se crea una instancia de pruebas que refleja la rama solicitada en el pull request. A continuación se detalla el flujo de despliegue de pruebas:

Se genera un evento workflow dispatch mediante una pull request específica.
Se inicia el flujo de despliegue de pruebas.
Se crea una instancia de pruebas en AWS.
Se despliega la rama solicitada en la instancia de pruebas.
Se notifica en Slack sobre el inicio y finalización del despliegue de pruebas.

### Despliegue en Producción
El despliegue en producción es similar al despliegue de pruebas, pero en este caso no se requiere un pull request específico, ya que se despliega directamente lo que se encuentra en la rama principal (main). A continuación se explica el flujo de despliegue en producción:

Se detecta un evento de push en la rama principal (main) del repositorio.
Se inicia el flujo de despliegue en producción.
Se crea una instancia en AWS para el entorno de producción.
Se despliega la última versión de la rama principal en la instancia de producción.
Se notifica en Slack sobre el inicio y finalización del despliegue en producción.
Monitoreo y Notificaciones
El monitoreo y las notificaciones se realizan a través de Slack. Se envían notificaciones en los siguientes eventos:

Cuando se inicia un despliegue en producción.
Cuando se genera un plan de Terraform para el despliegue en producción.
Cuando se ejecuta el comando terraform apply en el despliegue en producción.
Cuando se destruyen los despliegues en pruebas y producción.
Estas notificaciones se envían al canal de Slack designado y contienen información relevante sobre los eventos mencionados.



