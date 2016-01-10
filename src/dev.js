import {render} from 'react-dom';
import ScrollView from './ScrollView.jsx';

render((
    <div style={{width: 300, height: 300}}>
        <ScrollView>
            <div style={{width: 600, height: 600}}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus magna molestie iaculis cursus.
                    Donec eget sollicitudin augue. Nullam scelerisque mi ex, quis rutrum nibh ornare vitae. Curabitur
                    faucibus mauris ac velit egestas finibus. In pretium vel purus ut viverra. Vestibulum a iaculis
                    dolor.
                    Cras ultrices, ante ac vehicula aliquam, lorem ante tincidunt diam, in mattis enim nisi et erat.
                    Nunc
                    pulvinar sagittis ligula, a tempor neque posuere at. Class aptent taciti sociosqu ad litora torquent
                    per
                    conubia nostra, per inceptos himenaeos. In consectetur, tortor nec condimentum consequat, tellus
                    felis
                    efficitur elit, eu volutpat dui dolor et lacus. Nunc euismod tellus quis mauris scelerisque
                    accumsan.
                </p>
                <p>
                    Integer euismod malesuada nisl, eget pulvinar enim fermentum ac. Donec facilisis lorem et lobortis
                    mattis. Nulla quis efficitur ex, et mollis libero. Sed et vulputate lacus, id ultrices justo.
                    Interdum
                    et malesuada fames ac ante ipsum primis in faucibus. Pellentesque tempor tristique orci, sit amet
                    fermentum velit porttitor eu. Donec dapibus dapibus diam, vel dignissim velit molestie sit amet.
                    Suspendisse quis posuere ante. Donec facilisis aliquet erat, vel pulvinar orci egestas non. Nulla
                    tempus
                    eu leo id condimentum. Suspendisse eu egestas tellus, sit amet rhoncus arcu.
                </p>

                <p>
                    Vivamus dictum magna neque, eget auctor nisl venenatis at. Nullam augue nunc, hendrerit a posuere
                    vitae,
                    auctor ac turpis. Ut scelerisque commodo justo, non eleifend velit semper non. Sed sit amet gravida
                    neque. Nullam interdum laoreet consequat. Etiam imperdiet augue nisi, at iaculis augue aliquam vel.
                    Praesent varius sapien ut magna tincidunt scelerisque.
                </p>

                <p>
                    Etiam rutrum pulvinar nibh, vitae gravida tortor tempor feugiat. In turpis ex, molestie a diam
                    vitae,
                    interdum vestibulum dolor. Vestibulum hendrerit semper dui ac tempor. Donec mollis diam in lectus
                    mattis
                    laoreet. Ut interdum eu velit vitae iaculis. Maecenas nec lectus volutpat justo iaculis vestibulum
                    ac
                    non tellus. Nulla facilisi. Praesent tempus mattis aliquam. Sed vulputate facilisis accumsan. Nunc
                    ut
                    neque lectus. Nulla nec imperdiet velit, vitae eleifend urna. Ut viverra libero non erat varius
                    ullamcorper. Vivamus in volutpat elit, quis hendrerit ex. Donec nec odio ac elit convallis
                    pellentesque.
                    Sed fermentum diam sed est fermentum, efficitur maximus turpis dapibus.
                </p>

                <p>
                    Nam ut eleifend erat. Phasellus odio tortor, aliquam ac scelerisque eget, maximus rhoncus sapien.
                    Integer eu posuere purus, at lobortis mauris. Sed tincidunt, velit in posuere feugiat, magna arcu
                    ornare
                    lacus, a vulputate nibh eros a neque. Sed vestibulum mauris eget turpis bibendum interdum. In rutrum
                    malesuada ex quis sodales. Aliquam sagittis nisl sed risus imperdiet gravida. Maecenas sit amet
                    euismod
                    dolor. Integer feugiat ut dui eget finibus. Maecenas sed rhoncus felis. Pellentesque quam tellus,
                    vestibulum vel dolor vel, aliquam ullamcorper velit.
                </p>
            </div>
        </ScrollView>
    </div>
), document.getElementById('container'));

render((
    <div style={{width: 300, height: 300}}>
        <ScrollView>
            <div style={{width: 300, height: 300}}>Should not have any scroll bar.</div>
        </ScrollView>
    </div>
), document.getElementById('noBar'));

render((
    <div style={{width: 300, height: 300}}>
        <ScrollView>
            <div style={{width: 400, height: 300}}>Should have horizontal scroll bar.</div>
        </ScrollView>
    </div>
), document.getElementById('hor'));

render((
    <div style={{width: 300, height: 300}}>
        <ScrollView>
            <div style={{width: 300, height: 400}}>
                <p>
                    Nam ut eleifend erat. Phasellus odio tortor, aliquam ac scelerisque eget, maximus rhoncus sapien.
                    Integer eu posuere purus, at lobortis mauris. Sed tincidunt, velit in posuere feugiat, magna arcu
                    ornare
                    lacus, a vulputate nibh eros a neque. Sed vestibulum mauris eget turpis bibendum interdum. In rutrum
                    malesuada ex quis sodales. Aliquam sagittis nisl sed risus imperdiet gravida. Maecenas sit amet
                    euismod
                    dolor. Integer feugiat ut dui eget finibus. Maecenas sed rhoncus felis. Pellentesque quam tellus,
                    vestibulum vel dolor vel, aliquam ullamcorper velit.
                </p>
            </div>
        </ScrollView>
    </div>
), document.getElementById('ver'));