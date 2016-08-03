/**
 * 百度地图使用工具类-v1.5
 * 
 * @author boonya
 * @date 2013-7-7
 * @address Chengdu,Sichuan,China
 * @email boonya@sina.com
 * @company KWT.Shenzhen.Inc.com
 * @notice 有些功能需要加入外部JS库才能使用，另外还需要申请地图JS key .
 *         申请地址：http://developer.baidu.com/map/apply-key.htm
 */
(function() {

    var map = {};
    window.map={};
    window.BmapUtils={};
    window.infoWindow={};
    window.BmapUtils.lineFreature={};
    window.LocalSearch={};
    /**
     * 百度地图基础操作
     */
    BmapUtils = {
        /**
         * 全局变量
         */
        CONSTANT : {
            CONTAINER : "map",
            DEFAULT_ZOOM : 12,
            SEARCH_PANEL:"r-result",
            LINE_MAKERS_SHOW:false
        },
        /**
         * 获取地图视图范围坐标
         * @returns {object} 范围对象
         */
        getBounds : function() {
            if (map) {
                var bs = map.getBounds(); // 获取可视区域
                var bssw = bs.getSouthWest(); // 可视区域左下角
                var bsne = bs.getNorthEast(); // 可视区域右上角
                return {
                    leftBottom : bssw,
                    rightTop : bsne
                };
            }
            return null;
        },
        /**
         * 设置车辆图标
         * @param carImgUrl  {string}            车辆图片路径
         * @returns {BMap.Icon}                  百度Icon图标对象
         */
        getIcon : function(carImgUrl,width,height) {
            var myIcon = new BMap.Icon(carImgUrl, new BMap.Size(width||20, height||20), { // 小车图片
                // offset: new BMap.Size(0, -5), //相当于CSS精灵
                imageOffset : new BMap.Size(0, 0)// 图片的偏移量。为了是图片底部中心对准坐标点。
            });
            return myIcon;
        },
        /**
         * 初始化普通地图
         * @param lon            {number} 经度
         * @param lat            {number} 纬度
         * @param zoom           {number} 缩放等级
         */
        initCommonMap : function(lon, lat, zoom) {
            map = new BMap.Map(this.CONSTANT.CONTAINER);
            var point = new BMap.Point(lon || 116.331398, lat || 39.897445); // 默认地图初始化位置为北京
            map.centerAndZoom(point, zoom || this.CONSTANT.DEFAULT_ZOOM);
        },
        /**
         * 初始化3D地图
         * @param lon            {number} 经度
         * @param lat            {number} 纬度
         * @param cityname       {string} 城市名称
         * @param zoom           {number} 缩放等级
         */
        my3Dmap : function(lon, lat, cityname, zoom) {
            map = new BMap.Map(this.CONSTANT.CONTAINER, {
                mapType : BMAP_PERSPECTIVE_MAP
            });
            var point = new BMap.Point(lon || 116.4035, lat || 39.915);
            map.setCurrentCity(cityname || "北京"); // 设置地图显示的城市 此项是必须设置的
            map.centerAndZoom(point, zoom || this.CONSTANT.DEFAULT_ZOOM);
            map.enableScrollWheelZoom(true);
        },
        /**
         * 初始化卫星地图
         * @param lon            {number} 经度
         * @param lat            {number} 纬度
         * @param zoom           {number} 缩放等级
         */
        satelliteMap : function(lon, lat, zoom) {
            map = new BMap.Map(this.CONSTANT.CONTAINER, {
                mapType : BMAP_HYBRID_MAP
            }); // 设置卫星图为底图
            var point = new BMap.Point(lon || 116.4035, lat || 39.915);
            map.centerAndZoom(point, zoom || this.CONSTANT.DEFAULT_ZOOM);
            map.enableScrollWheelZoom(true);
        },
        /**
         * 初始化地图（含普通操作控件）
         */
        initBaiduMap:function(anchor){
            BmapUtils.initCommonMap(); // 初始化普通地图
            map.enableDragging(); // 开启拖拽
            // map.disableDragging(); // 禁止拖拽
            // map.enableInertialDragging(); // 开启惯性拖拽
            map.enableScrollWheelZoom(true); // 允许鼠标滚轮缩放地图
            var navigtionControl=anchor||{anchor : BMAP_ANCHOR_TOP_LEFT};
            map.addControl(new BMap.NavigationControl(navigtionControl)); // 添加默认缩放平移控件
            map.addControl(new BMap.ScaleControl({
                anchor : BMAP_ANCHOR_BOTTOM_LEFT
            })); // 左下角比例尺控件
            map.addControl(new BMap.OverviewMapControl()); // 添加默认缩略地图控件(鹰眼)
            var cr = new BMap.CopyrightControl({
                anchor : BMAP_ANCHOR_BOTTOM_LEFT
            });
            map.addControl(cr); // 添加版权控件（支持自定义版权控件）
            window.map=map;
        },
        /**
         * 初始化小地图
         * @param type  {number}     平移缩放类型：平移和缩放1,只有平移2,只有缩放3,默认只有缩放
         * @param position {number}  停靠的位置：上左1，上右2，下左3，下右4,默认为上左
         */
        smallMap:function(type,position){
            BmapUtils.initCommonMap(); // 初始化普通地图
            map.enableDragging(); // 开启拖拽
            map.enableScrollWheelZoom(true); // 允许鼠标滚轮缩放地图
            map.addControl(new BMap.ScaleControl({
                anchor : BMAP_ANCHOR_BOTTOM_LEFT
            })); // 左下角比例尺控件
            map.addControl(new BMap.OverviewMapControl()); // 添加默认缩略地图控件(鹰眼)
            var cr = new BMap.CopyrightControl({
                anchor : BMAP_ANCHOR_BOTTOM_LEFT
            });
            var navigtion_type="",where="";
            //平移导航的类型
            switch (type) {
            case 1:
                navigtion_type=BMAP_NAVIGATION_CONTROL_SMALL;
                break;
            case 2:
                navigtion_type=BMAP_NAVIGATION_CONTROL_PAN;
                break;
            case 3:
                navigtion_type=BMAP_NAVIGATION_CONTROL_ZOOM;
                break;
            default:
                navigtion_type=BMAP_NAVIGATION_CONTROL_ZOOM;
                break;
            }
            //平移导航停靠的位置
            switch (position) {
            case 1:
                where=BMAP_ANCHOR_TOP_LEFT;
                break;
            case 2:
                where=BMAP_ANCHOR_TOP_RIGHT;
                break;
            case 3:
                where=BMAP_ANCHOR_BOTTOM_LEFT;
                break;
            case 4:
                where=BMAP_ANCHOR_BOTTOM_LEFT;
                break;
            default:
                where=BMAP_ANCHOR_TOP_LEFT;
            break;
            }
            map.addControl(cr); // 添加版权控件（支持自定义版权控件）
            map.addControl(new BMap.NavigationControl({anchor: where, type: navigtion_type})); 
            LocalSearch=new BMap.LocalSearch(map, {
                renderOptions:{map: map,panel:this.CONSTANT.SEARCH_PANEL}
            });
            window.map=map;
        },
        /**
         * IP定位城市
         */
        ipLocateCity : function() {
            var myFun = function(result) {
                var cityName = result.name;
                map.setCenter(cityName);
            };
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
        },
        /**
         * 平移地图
         * @param lon            {number} 经度
         * @param lat            {number} 纬度
         */
        panTo : function(lon, lat) {
            var point = new BMap.Point(lon, lat);
            map.panTo(point);
        },
        /**
         * 平移地图
         * @param lon            {number} 经度
         * @param lat            {number} 纬度
         */
        panToPoint: function(point) {
            map.panTo(point);
        },
        /**
         * 创建信息窗口
         * @param title    {string}  标题
         * @param message  {string}  发送短信消息内容
         * @param divContent  {string}  文本内容
         * @returns {BMap.InfoWindow}   信息对象
         */
        createInfoWindow:function(title,message,divContent){
            var sendMessage=false;
            if(message) sendMessage=true;
            var opts = {
                width : 97, // 信息窗口宽度
                height : 95, // 信息窗口高度
                title : title, // 信息窗口标题
                enableMessage : sendMessage, // 设置允许信息窗发送短息
                message : message            // 允许发送短信
            };
            window.infoWindow = new BMap.InfoWindow(divContent, opts); // 创建信息窗口对象
            return window.infoWindow;
        },
        /**
         * 打开一个信息窗口
         * @param title   {string}      信息标题
         * @param message   {string}    需要发送的信息
         * @param divContent   {string} 信息内容
         * @param point   {object}      百度坐标点
         */
        addInfoWindow : function(title,message,divContent,point,isCenter) {
            window.infoWindow=this.createInfoWindow(title, message, divContent);
            window.infoWindow.enableAutoPan();
            map.openInfoWindow(window.infoWindow, point); // 开启信息窗口
            if(isCenter)map.setCenter(point);
        },
        /**
         * 获取地图上打开的信息窗口
         * @returns  object||null
         */
        getOpendInfoWindow:function(){
            return map.getInfoWindow();
        },
        /**
         * 重绘信息窗口
         * @param  信息窗口对象
         */
        redrawInfoWindow:function(){
            window.infoWindow.redraw();
        },
        /**
         * 居中和缩放
         * @param point     {object} 百度坐标点
         * @param zoomLevel {number} 缩放等级
         */
        centerAndZoom:function(point,zoomLevel){
            map.setCenter(point);
            map.setZoom(zoomLevel);
        }
    };

    /**
     * 百度要素操作工具
     */
    BmapUtils.tootls = {
        /**
         * 越界控制
         */
        handleFeatureInBounds:function(point) {
            var bounds =map.getBounds();
            if (!bounds.containsPoint(point)){
                map.panTo(point); // 是否在视图范围之内，若跃出视图则平滑居中
            }
        },
        /**
         * 测量两点的距离
         * @param pointA            百度坐标点A
         * @param pointB            百度坐标点B
         * @return {number}         距离大小：单位：米(meter)
         */
        distance : function(pointA, pointB) {
            return map.getDistance(pointA, pointB); // 获取两点距离
        },
        /**
         * 添加Marker对象
         * @param title            {String}  toolTip文字
         * @param point            {object}  百度坐标点对象
         * @param name             {string}  显示名称
         * @param showLabel        {boolean} 是否显示标注的文本
         * @param myIcon           {boolean} Icon图片对象
         */
        addMarker : function(title,point, name, showLabel,myIcon) {
            var marker = new BMap.Marker(point,{icon:myIcon});
            if (showLabel) {
                var label = new BMap.Label(name, {
                    offset : new BMap.Size(20, -10)
                });
                marker.setLabel(label);
            }
            marker.setTitle(title);
            map.addOverlay(marker);
            return marker;
        },
        /**
         * 定位添加marker坐标
         * @param lon            {number} 经度
         * @param lat            {number} 纬度
         * @param isShow         {boolean} 系统打开或关闭
         */
        addMarkerDisplayOrUnDisplay : function(lon, lat, isShow) {
            var marker = new BMap.Marker(new BMap.Point(lon, lat)); // 创建标注
            marker.prototype=new  BMap.Overlay();
            map.addOverlay(marker); // 将标注添加到地图中
            if (isShow) {
                marker.show();
            } else {
                marker.hide();
            }
        },
        /**
         * 添加折线(轨迹)
         *  @param points       百度坐标对象集合
         */
        addLineFeature : function(points,style) {
            var default_style={
                    strokeColor : "#3976F0",
                    strokeWeight : 3,
                    strokeOpacity : 0.5
                };
            var polyline = new BMap.Polyline(points,style|| default_style );
            map.addOverlay(polyline); // 添加折线到地图上
            return polyline;
        },
        /**
         * 添加折线(轨迹,包括起点、终点)
         * @param sepoint                  {object} 起终点的名称.start ,.end
         * @param points                {array} 原始JSON坐标对象集合
         * @param startImageUrk         {string} 起点图片路径
         * @param endImageUrk           {string} 终点图片路径
         */
        addLineFeatureAndStartAndEndPoint : function(sepoint,points, startImageUrk,    endImageUrk,lineStyle) {
            var len=points.length;
            var index =len - 1;
            var startPoint = points[0];
            var endPoint =points[index];
            var startIcon = BmapUtils.getIcon(startImageUrk,20,20);
            startIcon.setImageSize(new BMap.Size(20,20));
            var endIcon = BmapUtils.getIcon(endImageUrk,20,20);
            endIcon.setImageSize(new BMap.Size(20,20));
            var startMarker = new BMap.Marker(startPoint, {
                icon : startIcon
            });
            var endMarker = new BMap.Marker(endPoint, {    icon : endIcon});
            startMarker.setTitle(sepoint.start);
            endMarker.setTitle(sepoint.end);
            if(len>=2){
                var d=(len/2)+"";
                d=parseInt(d);
                map.centerAndZoom(points[d],12);
            }
            this.addLineFeature(points,lineStyle);
            map.addOverlay(startMarker);
            map.addOverlay(endMarker);
        },
        /**
         * 路径规划
         * 
         * @param startPoint     {object} 起点
         * @param endPoint       {object} 终点
         * @param carImgUrl      {string} 车辆图片路径
         */
        roadPlanToRun : function(startPoint, endPoint, carImgUrl) {
            var driving2 = new BMap.DrivingRoute(map, {
                renderOptions : {
                    map : map,
                    autoViewport : true
                }
            }); // 驾车实例
            driving2.search(startPoint, endPoint); // 显示一条公交线路

            var run = function() {
                var driving = new BMap.DrivingRoute(map); // 驾车实例
                driving.search(myP1, myP2);
                driving.setSearchCompleteCallback(function() {
                    var pts = driving.getResults().getPlan(0).getRoute(0)
                            .getPath(); // 通过驾车实例，获得一系列点的数组
                    var paths = pts.length; // 获得有几个点

                    var carMk = new BMap.Marker(pts[0], {
                        icon : BmapUtils.getIcon(carImgUrl)
                    });
                    map.addOverlay(carMk);
                    i = 0;
                    function resetMkPoint(i) {
                        carMk.setPosition(pts[i]);
                        if (i < paths) {
                            setTimeout(function() {
                                i++;
                                resetMkPoint(i);
                            }, 100);
                        }
                    }
                    setTimeout(function() {
                        resetMkPoint(5);
                    }, 100);

                });
            };

            setTimeout(function() {
                run();
            }, 500);
        },
        /**
         * 轨迹回放
         * @param points        {Array} 百度坐标点集合
         * @param carImgUrl     {string} 车辆图片的地址
         */
        trackPlay : function(points, carImgUrl) {
            var carMk = new BMap.Marker(points[0], {
                icon : BmapUtils.getIcon(carImgUrl)
            });
            map.addOverlay(carMk);
            var i = 0;
            function resetMkPoint(i) {
                carMk.setPosition(points[i]);
                if (paths &&i < paths) {
                    setTimeout(function() {
                        i++;
                        resetMkPoint(i);
                    }, 100);
                }
            }
            setTimeout(function() {
                resetMkPoint(i);
            }, 100);
        },
        /**
         * 添加圆
         * @param lon     {number} 经度
         * @param lat     {number} 纬度
         * @param radius{number}   半径
         */
        addCircle : function(lon, lat, radius) {
            var point = new BMap.Point(lon, lat);
            map.centerAndZoom(point, 16);
            var circle = new BMap.Circle(point, radius);
            map.addOverlay(circle);
        },
        /**
         * 添加多边形
         * @param points {array} 百度坐标点集合
         */
        addPolygon : function(points) {
            var polygon = new BMap.Polygon(points, {
                strokeColor : "blue",
                strokeWeight : 3,
                strokeOpacity : 0.5
            });
            map.addOverlay(polygon);
        },
        /**
         * 根据用户覆盖物的标识属性获取覆盖物
         * @param properties  {string} 属性名称
         * @param nodeId      {string} 属性字段的值
         */
        getOverlayByNodeId:function(properties,value){
            var overlays=map.getOverlays();
            for ( var i = 0,le=overlays.length; i < le; i++) {
                var overlay=overlays[i];
                if(overlay[properties]==value){
                    return overlay;
                }
            }
            return null;
        },
        /**
         * 根据用户覆盖物的标识属性显示覆盖物
         * 
         * @param properties  {string} 属性名称
         * 
         * @param nodeId      {string} 属性字段的值
         */
        showOverlay:function(properties,value){
            var overlay=this.getOverlayByNodeId(properties, value);
            overlay.show();
        },
        /**
         * 根据用户覆盖物的标识属性隐藏覆盖物
         * @param properties  {string} 属性名称
         * @param nodeId      {string} 属性字段的值
         */
        hideOverlay:function(properties,value){
            var overlay=this.getOverlayByNodeId(properties, value);
            overlay.hide();
        },
        /**
         * 根据用户覆盖物的标识属性移除覆盖物
         * @param properties  {string} 属性名称
         * @param nodeId      {string} 属性字段的值
         */
        removeOverlay:function(properties,value){
            var overlay=this.getOverlayByNodeId(properties, value);
            if(overlay) map.removeOverlay(overlay);
        },
        /**
         * 删除地图上所有覆盖物
         */
        removeAllOverlays:function(){
            map.clearOverlays();
        },
        /**
         * 控制缩放层级显示图标显示或隐藏
         * @param markers {array}  标注数组
         * @param zoom {number}    缩放等级
         */
        controlMakersHideOrShowByZoom:function(markers,zoom){
            if(markers){
                var map_zoom=map.getZoom();
                if(map_zoom<zoom){
                    for ( var i = 0; i < markers.length; i++) {
                        var overlay=markers[i];
                        if(overlay){
                            overlay.prototype=new BMap.Overlay();
                            overlay.hide();
                        }
                    }
                    BmapUtils.CONSTANT.LINE_MAKERS_SHOW=false;
                }else{
                    if(BmapUtils.CONSTANT.LINE_MAKERS_SHOW==false){
                        for ( var i = 0; i <markers.length; i++) {
                            var overlay=markers[i];
                            if(overlay){
                                overlay.prototype=new BMap.Overlay();
                                overlay.show();
                            }
                        }
                        BmapUtils.CONSTANT.LINE_MAKERS_SHOW=true;
                    }
                }
            }
        }
    };

    /**
     * 百度探索处理
     */
    BmapUtils.search = {
        /**
         * 本地探索（含自动提示）
         * @param inputSuggestId         {string} 输入框的id属性
         * @param searchResultPanelId    {string} 结果面板的id属性
         */
        localSearch : function(inputSuggestId, searchResultPanelId) {
            function G(id) {
                return document.getElementById(id);
            }
            var ac = new BMap.Autocomplete( // 建立一个自动完成的对象
            {
                "input" : inputSuggestId,
                "location" : map
            });

            ac.addEventListener("onhighlight", function(e) { // 鼠标放在下拉列表上的事件
                var str = "";
                var _value = e.fromitem.value;
                var value = "";
                if (e.fromitem.index > -1) {
                    value = _value.province + _value.city + _value.district
                            + _value.street + _value.business;
                }
                str = "FromItem<br />index = " + e.fromitem.index
                        + "<br />value = " + value;

                value = "";
                if (e.toitem.index > -1) {
                    _value = e.toitem.value;
                    value = _value.province + _value.city + _value.district
                            + _value.street + _value.business;
                }
                str += "<br />ToItem<br />index = " + e.toitem.index
                        + "<br />value = " + value;
                G(searchResultPanelId).innerHTML = str;
            });

            var myValue = "", local = {};
            var setPlace = function() {
                map.clearOverlays(); // 清除地图上所有覆盖物
                function myFun() {
                    var pp = local.getResults().getPoi(0).point; // 获取第一个智能搜索的结果
                    map.centerAndZoom(pp, 18);
                    map.addOverlay(new BMap.Marker(pp)); // 添加标注
                }
                local = new BMap.LocalSearch(map, { // 智能搜索
                    onSearchComplete : myFun
                });
                local.search(myValue);
            };
            ac.addEventListener("onconfirm", function(e) { // 鼠标点击下拉列表后的事件
                var _value = e.item.value;
                myValue = _value.province + _value.city + _value.district
                        + _value.street + _value.business;
                G(searchResultPanelId).innerHTML = "onconfirm<br />index = "
                        + e.item.index + "<br />myValue = " + myValue;
                setPlace();
            });
        },
        /**
         * POI查询
         * @param inputId {string}  输入框id属性名称
         */
        poiSearch:function(inputId){
            var poiInfo=$("#"+inputId).val();
            var mapZoom=map.getZoom();
            if(mapZoom<12){
                $.messager.alert("提示", "当前搜索面积太广，请将地图放大到市级别后再搜索", "warning");
                return ;
            }
            if(poiInfo==""){
                $.messager.alert("提示", "请输入搜索关键字", "warning");
                return ;
            }
            LocalSearch.searchInBounds(poiInfo, map.getBounds());
        }
    };
    
    /**
     * 百度地图自定义控件
     */
    BmapUtils.control={
            /**
             * 轨迹回放操作菜单控件
             */
            addTrakPalyControl:function(){
                function TrackControl(){
                  // 默认停靠位置和偏移量
                  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
                  this.defaultOffset = new BMap.Size(10, 20);
                }

                // 通过JavaScript的prototype属性继承于BMap.Control
                TrackControl.prototype = new BMap.Control();

                // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
                // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
                TrackControl.prototype.initialize = function(map){
                     // 创建一个DOM元素
                     // var mapContainerDiv= map.getContainer();
                     var div=document.createElement("div");
                     // 创建节点内容
                    
                     var htmlContent='<div class="playDiv" style="z-index: 1000;position: absolute; right: 10px; bottom: 20px;">'+
                          '<div class="f-right ml20">'+
                        '<input id="slider_" class="easyui-slider" style="width:200px;background-color: orange;" data-options="showTip:true,min:0,step:10,max:100,rule:[0,'|',10,'|',20,'|',30,'|',40,'|',50,'|',60,'|',70,'|',80,'|',90,'|',100],tipFormatter:function(v){return v+'%';},onSlideEnd:function(value){process(value);}"  style="float:left"/>'+
                        ' </div>'+
                        '<div class="f-right" id="uoptions">'+
                        ' <a id="thisplay" href="javascript:void(0)" onclick="playOrReplay()" class="easyui-linkbutton" data-options="disabled:true">播放</a> '+
                        ' <a id="thispause" href="javascript:void(0)" onclick="pauseOrgo(1)" class="easyui-linkbutton" data-options="disabled:true">暂停</a> '+
                        ' <a id="thiscontinue" href="javascript:void(0)" onclick="pauseOrgo(2)" class="easyui-linkbutton" data-options="disabled:true">继续</a> '+
                        ' <a id="export" href="javascript:void(0)" onclick="reportorExport()" class="easyui-linkbutton" data-options="disabled:true">导出</a> '+
                        '</div></div>';
                     var  playDiv=document.createTextNode(document.createTextNode(htmlContent));
                     // 添加文字说明
                     div.appendChild(playDiv);
                     // 将DOM元素返回
                     return div;
                };
                // 创建控件
                var myTrackCtrol = new TrackControl();
                // 添加到地图当中
                map.addControl(myTrackCtrol);
            }
    };
    
    /**
     * 地图事件
     */
    BmapUtils.event={
            zoomed:function(markers,zoom){
                map.addEventListener("zoomend",function(){
                    BmapUtils.tootls.controlMakersHideOrShowByZoom(markers, zoom);
                });
            },
            removeZoomed:function(markers,zoom){
                map.removeEventListener("zoomend",function(){
                    BmapUtils.tootls.controlMakersHideOrShowByZoom(markers, zoom);
                });
            }
    };

})();