
import Buttons from '../component/Buttons';
import Logo from '../component/Logo';
import Mouse from '../component/Mouse';
import Navigations from '../component/Navigations';
import Project from '../component/Project';


const Project1 = () => {
    

    return (
        <main>
            <Mouse />
            <div className="project">
                <Navigations />
                <Logo />
                <Project number={0} />
                <Buttons left={"/"} right={"/projet-2"} />

            </div>

        </main>
    );
};

export default Project1;