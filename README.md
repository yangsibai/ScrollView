## osx-scrollview

An osx style scroll view react component.

Check demo at <http://blog.sibo.me/osx-scrollview/>

### Installation

    npm install osx-scrollview

### Usage

    import {render} from "react-dom";
    import ScrollView from "osx-scrollview";

    render((
        <div style={{width: 300, height: 300}}>
            <ScrollView>
                <div style={{width: 400, height: 400}}>Content</div>
            </ScrollView>
        </div>
    ), document.getElementById('container'));

### License

MIT
