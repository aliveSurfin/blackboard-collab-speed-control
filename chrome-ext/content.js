var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (!mutation.addedNodes) {
            return;
        }
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            var cur = mutation.addedNodes[i];
            try {
                if (cur.classList.contains("control-bar")) {
                    //console.log(cur);
                    for (let x = 0; x < cur.childNodes.length; x++) {
                        if (cur.childNodes[x].classList.contains("playback-controls")) {
                            function updateSpeedLabel(video) {
                                var len = video.playbackRate.toString().length;
                                var str = video.playbackRate.toString();
                                var text = len == 4 ? str : len == 3 ? str + "0" : str + ".00";
                                document.getElementsByClassName("blackboard-speed-control reset")[0].innerText = text;
                            }
                            var down = document.createElement("button");
                            down.innerText = "<<";
                            down.style.color = "#fff"
                            down.style.backgroundColor = "#000"
                            down.style.gridColumnStart = "1";
                            down.style.gridColumnEnd = "2";
                            down.onclick = function () {
                                var video = document.getElementsByTagName("video")[0];
                                if (video === undefined) {
                                    return
                                }
                                if (video.playbackRate == 0) {
                                    return;
                                }
                                video.playbackRate -= .25;
                                updateSpeedLabel(video);
                            }
                            down.title = "Reduce Speed <<";

                            var reset = document.createElement("button");
                            reset.innerText = "1.0"
                            reset.style.color = "#fff"
                            reset.style.backgroundColor = "#000"
                            reset.style.gridColumnStart = "2";
                            reset.style.gridColumnEnd = "3";
                            reset.className = "blackboard-speed-control reset"
                            reset.onclick = function () {
                                var video = document.getElementsByTagName("video")[0];
                                if (video === undefined) {
                                    return
                                }
                                if (video.playbackRate == 1) {
                                    return;
                                }
                                video.playbackRate = 1;
                                updateSpeedLabel(video);
                            }
                            reset.title = "Reset speed"


                            var up = document.createElement("button");
                            up.innerText = ">>"
                            up.style.color = "#fff"
                            up.style.backgroundColor = "#000"
                            up.style.gridColumnStart = "3";
                            up.style.gridColumnEnd = "4";
                            up.onclick = function () {
                                var video = document.getElementsByTagName("video")[0];
                                if (video === undefined) {
                                    return
                                }
                                if (video.playbackRate == 10) {
                                    return;
                                }
                                video.playbackRate += .25;
                                updateSpeedLabel(video);
                            }
                            up.title = "Increase speed >>"


                            var div = document.createElement("div");
                            div.style.display = "grid";
                            div.style.gridGap = "10px";
                            div.style.gridTemplateColumns = "1 1 1";
                            div.appendChild(down);
                            div.appendChild(reset);
                            div.appendChild(up);

                            document.getElementsByClassName("playback-controls")[0].appendChild(div);
                            console.log("blackboard-collab-speed-control : inserted");
                        }
                    }
                }
            } catch {

            }

        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});