/**
 * Created by smilen on 02/04/2018.
 */

require.config({

    paths: {
        "imageSwitch": "../plug-in/imageSwitch/imageSwitch3"
    }

});

require(['imageSwitch'], function (ImageSwitch){

    window.onload = function() {
        var imageSwitch = new ImageSwitch({
            id: 'box',
            images:[
                'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2460377593,4222332340&fm=173&app=25&f=JPEG?w=218&h=146&s=E2915A8B4C5370C614318FF203005037',
                'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2460377593,4222332340&fm=173&app=25&f=JPEG?w=218&h=146&s=E2915A8B4C5370C614318FF203005037',
                'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2460377593,4222332340&fm=173&app=25&f=JPEG?w=218&h=146&s=E2915A8B4C5370C614318FF203005037'],
            theme:"#999"
        })

        imageSwitch.moveTo(2);
    }
    /*$(function() {
        var imageSwitch = new ImageSwitch({
            id: 'box',
            images:[
                'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2460377593,4222332340&fm=173&app=25&f=JPEG?w=218&h=146&s=E2915A8B4C5370C614318FF203005037',
                'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2460377593,4222332340&fm=173&app=25&f=JPEG?w=218&h=146&s=E2915A8B4C5370C614318FF203005037',
                'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2460377593,4222332340&fm=173&app=25&f=JPEG?w=218&h=146&s=E2915A8B4C5370C614318FF203005037'],
            theme:"#999"
        })

        imageSwitch.moveTo(2);
    })*/

});