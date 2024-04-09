
const Layer0Card = ({ index, levelName, levelContent }) => {
  return (
    <div key={index}>
                <strong>{levelName}</strong>: {levelContent}
              </div>
  )
}

export default Layer0Card