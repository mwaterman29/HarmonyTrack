const Component = () =>
{
    return (
        <div className="flex flex-col w-full p-12">
            <h1 className="text-4xl underline p-4 pl-0">The Rules of Working Out</h1>
            <p className="py-2">
                In a world full of bad workout advice, influencers trying to sell you things, and "shortcuts" to 6-pack abs, it's wrong to be neutral.
                With decades of exercise science, there is absolutely no reason to be confused about how to get in shape. It is well understood that 
                you can adhere to a number of basic principles and get in shape. It's not easy, but it's simple. Anything that tries to sell you a shortcut,
                or add needless complexity is a waste of your time, money, and energy. Similarly, anything that focuses on any single technique, micronutrient,
                or so-called secret trick is also a waste of your time.
            </p>

            <p className="">The basic principles by which you can see significant process are:</p>
            <ul className="list-disc pl-6">
                <li className="text-lg pt-4">Progressive Overload</li>
                <p>As your body adapts to the training, you must increase the intensity. Either in number of reps or effort per rep.</p>
                <li className="text-lg pt-4">Range of Motion</li>
                <p>It is well understood that high tension on a stretched muscle is what optimizes hypertrophic stimulus.</p>
                <p>Consequently, achieving a "deep stretch", and pursuing full range of motion on almost all exercises is undoubtedly the best.</p>
                <p>The idea of a "90-degree" squat or push-up is arbitrary, and does not do anything to bolster results.</p>
                <li className="text-lg pt-4">Proper Nutrition</li>
                <p>Proper nutrition is a must. You can read more about that on the <a>opinion page for nutrition.</a> </p>
                <li className="text-lg pt-4">SFR (MRV)</li>
                <p>The human body can only expend so much effort - this is the Maximum Recoverable Volume (MRV).</p>
                <p>This is the "budget" for working out, and using said expenditure, one should try to optimize the hypertrophic stimulus.</p>
                <p>This is the essential idea of the Stimulus to Fatigue Ratio (SFR).</p>
                <p>By the time you're centrally "spent" - you should have stimulated muscle growth as much as possible. </p>
                <p>It's important to note that extremely effective hypertrophy can occur well before complete energetic depletion,</p>
                <p>and that optimal adaptive volume may not mean you're truly and fully spent in every workout.</p>
                <li className="text-lg pt-4">Concentric vs. Eccentric form</li>
                <p>Note first that isometric holds are useless, and should be replaced in all areas.</p>
                <p>The concentric should be explosive and effortful. Of course, as you near the end of a set, </p>
                <p>The eccentric should be controlled throughout the full range of motion.</p>
                <p>You can pause at the bottom/top of a rep (between the c/e), though recent evidence is showing that it might not be strictly necessary.</p>
                <li className="text-lg pt-4">Rep Ranges</li>
                <p>There are optimal rep ranges for different desired results.</p>
                <ul className="pl-6 list-[square]">
                    <li className="text-lg pt-4">{'<'}3 reps is ideal for absolute peak strength improvements.</li>
                    <p>This is most relevant for either a competition context, or for a PR type exercise.</p>
                    <p>This is suboptimal for long-term gains, as the fatigue cost is extremely high.</p>
                    <li className="text-lg pt-4">3-8 reps is ideal for general strength gains.</li>
                    <p>You can still lift heavy while maintaining decent SFR</p>
                    <p>Good for building fundamental strength in the target muscle</p>
                    <p>Lower end of the range is best for building just strength over size.</p>
                    <p>To maximize either true single-shot strength or size gains, pursue the rep ranges above or below.</p>
                    <li className="text-lg pt-4">6-15 reps is ideal for hypertrophy (getting big)</li>
                    <p>If you want to get big, 12-15 reps per set is the way to do it.</p>
                    <p>The lower end of this rep range is the sweet spot for well-rounded strenght and size.</p>
                    <li className="text-lg pt-4">15-25 reps can be useful, but is rarely optimal</li>
                    <p>Still good for hypertrophy, and can get a lot of stimulus without extreme fatigure</p>
                    <p>Ideal when you need to conserve exertion, re-adapting muscles, or coming out of injury.</p>
                    <p>Not ideal for strength gains, but can be useful for building endurance and for specific SFR optimizations.</p>
                    <li className="text-lg pt-4">25+ reps is generally suboptimal</li>
                    <p>If you can do more than 25 of something, it's not great for hypertrophy or for strength gains.</p>
                    <p>Unless you have a specific need (eg, sport or specialization related) to do something a huge number of times, make it harder.</p>
                    <p>Good for injury recovery! Low-load, high volume stimulus is an important part of tissue remodeling.</p>
                </ul>
                <li className="text-lg pt-4">Periodization</li>
                <p>As the body adapts more and more to being highly athletic, it's important to break into distinct periods.</p>
                <p>Generally, this looks like 5-6 weeks of hard training, with around a week off inbetween.</p>
                <p>This often also involves bulking or cutting (read more in nutrition section), and consequent training adaptations.</p>
                <p>It's better to train too hard for 5-6 weeks at a time and need some rest than to chronically train below your max.</p>

                <li className="text-lg pt-4">Rest and Recovery</li>
                <p>Though it's obvious when you think about it, all growth occurs during rest.</p>
                <p>Proper sleep, minimizing general stress, and meeting nutritional needs are necessary conditions for optimal growth.</p>
                <p>Often, the body will have some leading indicators that a deload is necessary.</p>
                <p>You might start to feel weaker, feel joint pain, see hunger disregulation, get sick, etc.</p>
                <p>These are signs that a deload is imminently necessary.</p>
            </ul>
        </div>
    )
}

export default Component;