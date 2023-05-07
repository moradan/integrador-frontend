/**
 * Clase senialador
 * 
 * Esta clase provee un modo de encapsular las funcionalidades de navegacion dentro de un sitio web de una sola pagina.
 * La clase senialador fue concebida junto con la barra de navegacion de Bootstrap 5. Con el fin de facilitar su adopcion, en el disenio de esta clase se busca reutilizar el mark-up obligatorio de bootstrap, y asi reducir a un minimo o 0 el requerimiento de mark-up extra para que la clase funcione.
 * La barra de navegacion de Bootstrap 5 esta diseniada para navegar entre paginas, no dentro de una pagina. Por ese motivo la barra de navegacion expandida no se oculta automaticamente cuando hacemos click en un link; hacer click en un link no lo marca como activo porque Bootstrap asume que la pagina destino se encarga de marcar en html cual es el link activo. Debido a esto, me veo en la obligacion de hacer que la clase senialador asuma estas responsabilidades.
 * 
 * En un principio se espera que solo exista UNA unica instancia de la clase senialador y que ese objeto se encargue de controlar las acciones y reacciones de navegar dentro de una misma pagina.
 * 
 * La clase senialador tiene la responsabilidad de mantener actualizado cual link esta resaltado cuando se cambia de seccion utilizando tecnicas de desplazamiento, como la rueda del mouse, las flechas del teclado, o la barra de desplazamiento vertical.
 * La clase senialador tiene que ser responsable de desplazar la ventana del navegador hasta la seccion requerida cuando el cliente hace click en un link de navegacion de la barra de navegacion.
 * Tambien es responsabilidad de esta clase contraer el menu expandido cuando se hace click en un link, y, lo cual no esta contemplado en Bootstrap, cuando el cliente hace click en cualquier lugar de la pagina fuera del menu expandido.
 * 
 * Para cumplir con estas 3 tareas, la clase senialador tiene que agregar un event listener para los eventos click y scroll
 * 
 * El click listener tiene que determinar si se hizo click en la barra de navegacion o fuera. Si la barra esta expandida entonces hay que cerrarla (esto tiene que ocurrir independientemente de donde haya hecho click el usuario, la barra se debe cerrar tanto si el usuario hace click en un link, en el boton de cerrarla, o en cualquier lugar fuera de la barra.)
 * Si la barra no esta expandida, no hace falta cambiar el estado de expandida de la barra.
 * El click listener tambien tiene que vijilar si se hizo click en un elemento link para disparar la accion de desplazar hasta la seccion deseada.
 * El listener de scroll se encarga de mantener actualizado cual link esta resaltada y cuales atenuados.
 * Cada vez que se efectua un desplazamiento, este listener tiene que comparar la variable Window.scrollY con el breakpoint de cada seccion navegable para decidir cual seccion esta mas centrada en la vista vertical; luego atenuar todos los links de navegacion; y finalmente resaltar el link que corresponde a la seccion que actualmente esta centrada en pantalla.
 * 
 * Para conseguir todos estos efectos, el objeto de clase senialador precisa informacion sobre la pagina que debera ser almacenada en atributos.
 * 
 * Campos:
 * lista de links de navegacion
 * lista de destinos de navegacion
 * lista de puntos de quiebre entre destinos de navegacion
 * 
 * Metodos:
 * scroll listener
 *  determinar seccion
 *  borrar atenuacion en todos los likns
 *  activar resaltado en el link que corresponde a la seccion
 * click listener
 *  determinar si el menu esta desplegado
 *  ocultar el menu
 */

