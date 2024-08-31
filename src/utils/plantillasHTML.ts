export const welcomeNearvet = ({nombre, email, passwordDefault, logo}) => {
    return `<div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#cbd5e1', // bg-slate-300
      border: '2px solid black',
    }}
  >
    <h1
      style={{
        color: '#0f172a', // text-slate-950
        fontSize: '1.5rem', // text-2xl
        padding: '1rem', // p-4
      }}
    >
      ${nombre}! Ya formas parte de NearVet
    </h1>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem', // gap-2
      }}
    >
      <img
        src=${logo}
        alt="Logo de NearVet"
        style={{
          width: '100%',
          backgroundColor: '#fbbf24', // bg-detail
        }}
      />
      <div>
        <p
          style={{
            color: 'black',
            textAlign: 'center',
          }}
        >
          Nos alegra que estes con nosotros.
          <br />
          Desde NearVet nuestra prioridad es el cuidado de las mascotas.
        </p>
        <br />
        <h3
          style={{
            textAlign: 'justify',
          }}
        >
          Si todavia no iniciaste sesión te suministramos tus datos, no los
          compartas con nadie:
        </h3>
        <h4>Email: ${email}</h4>
        <h4>Contraseña: ${passwordDefault}</h4>
      </div>
    </div>
    <div
      style={{
        marginTop: '1rem', // mt-4
        padding: '1rem', // px-4
        width: '100%',
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#fbbf24', // bg-detail
      }}
    >
      <p>
        Atención! Te recomendamos ingresar a los ajustes de tu cuenta de
        NearVet y cambiar la contraseña.
      </p>
    </div>
  </div>`
}