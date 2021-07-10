import PropTypes from 'prop-types'

const Svg = ({active, link, name, width, height, color}) =>{
    return(
      <>
        <object className={`icon ${active && 'active'}`} type="image/svg+xml" data={link}>
          <img src={link} alt={name} />
        </object>
        <style jsx>
            {
                `   
                    .icon{
                        margin : 0 2px;
                        
                        padding : 1px;
                        width : ${width}px;
                        height : ${height}px;
                        align-items : center;
                        justify-content : center;
                        filter : ${color.defaultColor};
                    }

                    .active{
                        filter: ${color.activeColor};
                    } 
                `
            }
        </style>
      </>
    )
  }

  

  Svg.defaultProps = {
      active : false,
      width : 20,
      height : 20,
      color : {
        defaultColor : "",
        activeColor : ""

    }
  }

  Svg.propTypes = {
    active : PropTypes.bool,
    link : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    width : PropTypes.number,
    height : PropTypes.number,
    color : PropTypes.object,
}

  export default Svg