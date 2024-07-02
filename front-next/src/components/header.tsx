import Image from 'public/Assets/icons/logo-reloj.svg'

const Header = () => {
    return (
      <header>
        <div className="conteiner-azul"></div>
        <div className="conteiner-hero">
          <div className="conteiner hero">
            <div className="conteiner-logo">
              <a href="/"><Image className="logo-reloj" src="public/Assets/icons/logo-reloj.svg" alt="Logo" width={50} height={50} /></a>
              <span className="logo-nombre"><a href="/">N TIME</a></span>
            </div>
          </div> 
        </div>
      </header>
    );
  };
  
  export default Header;