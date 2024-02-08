//Imports
import Image from 'next/image'

//image assets
import large_cubes from '@/public/large_cubes.svg'
import medium_cubes from '@/public/medium_cubes.svg'
import small_cubes from '@/public/small_cubes.svg'

const GoalPage = () => {
    return (
        <div>
            <h1>Goal Page</h1>
            <Image
                src={large_cubes}
                alt="Large cubes"
                width={100}
                height={100}
                />
        </div>
    );
}

export default GoalPage;