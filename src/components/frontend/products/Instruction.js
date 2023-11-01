import instructions from '../../../assets/instructions.json'

const Instruction = () => {
	return (
		<>
			{instructions.map((item) => {
				return (
					<div key={item.id}>
						<h6>{item.title}</h6>
						<p className='text-secondary'> {item.content}</p>
					</div>
				)
			})}
		</>
	)
}

export default Instruction
