import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

export function show_alert(mensaje, icono, foco){
    const mySwal = withReactContent(Swal);
    mySwal.fire({
        title: mensaje,
        icon: icono
    });
}
