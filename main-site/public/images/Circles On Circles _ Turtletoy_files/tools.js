"use strict";

const COLOR_RED = '#E74C3C';
const COLOR_GREEN = '#00bc8c';
const COLOR_BLUE = '#375a7f';

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function flashBorder(id, color) {
    $(id).css({outline: "2px solid " + color});
    setTimeout(() => {
        $(id).css({outline: "none"});
    }, 500);
}

function refreshComments() {
    const commentsContainer = $('#commentsContainer');
    if (commentsContainer && commentsContainer.attr('data-objectid')) {
        $.ajax({
            type: "GET",
            processData: false,
            contentType: false,
            url: "./turtle/comment/" + commentsContainer.attr('data-objectid'),
        }).done((data) => {
            commentsContainer.html(data);
            initFollowButtons(commentsContainer);
            initCommentContextMenuButtons(commentsContainer);
        })
    }
}

function showAlert(title, body) {
    const modal = $('#alertModal').first();
    if (modal) {
        $('#alertModalTitle').html(title);
        $('#alertModalBody').html(body);
        modal.modal('show');
    } else {
        alert(body);
    }
}

function showConfirm(title, body, callback) {
    const modal = $('#confirmModal').first();
    if (modal) {
        $('#confirmModalTitle').html(title);
        $('#confirmModalBody').html(body);
        $('#confirmModalOk').off('click');
        $('#confirmModalOk').click(() => {
            callback();
        });
        modal.modal('show');
    } else {
        if (confirm(body)) {
            callback();
        }
    }
}

function drawImageSquareCover(ctx, img) {
    const childWidth = img.width;
    const childHeight = img.height;

    const size = Math.min(childWidth, childHeight);

    const offsetX = (childWidth - size) * .5;
    const offsetY = (childHeight - size) * .5;

    ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

function grayScale(context, canvas) {
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    for (let i = 0, n = pixels.length; i < n; i += 4) {
        const grayscale = pixels[i] * .3 + pixels[i + 1] * .59 + pixels[i + 2] * .11;
        pixels[i] = grayscale;        // red
        pixels[i + 1] = grayscale;        // green
        pixels[i + 2] = grayscale;        // blue
        //pixels[i+3]              is alpha
    }
    //redraw the image in black & white
    context.putImageData(imgData, 0, 0);
}

function downloadFile(data, filename, type) {
    const file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        const a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function createCanvas(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d');
    context.lineWidth = 1;

    return canvas;
}

function initAndClearCanvas(canvas, context, opacity) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    context.fillStyle = opacity > 0 ? 'white' : 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = opacity > 0 ? 'black' : 'white';
    context.globalAlpha = Math.abs(opacity);
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function iconClipboard() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
</svg>`;
}

function iconToggleOff() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mr-2 bi-toggle-off" viewBox="0 0 16 16">
  <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
</svg>`;
}

function iconToggleOn() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mr-2 icon-selected d-none bi-toggle-on" viewBox="0 0 16 16">
  <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
</svg>`;
}


class canvas_resizer {
    constructor(canvas, targetSize, targetCanvas) {
        this.canvas = canvas;
        this.size = this.canvas.width;
        this.context = canvas.getContext('2d');
        this.targetSize = targetSize;

        if (targetCanvas) {
            targetCanvas.width = targetCanvas.height = targetSize;
        }

        this.resizeCanvasses = [];
        let size = this.size;

        if (size === targetSize) {
            this.resizeCanvasses.push(targetCanvas);
        }

        while (size !== targetSize) {
            size /= 2;
            let resizeCanvas;
            if (targetCanvas && size == targetSize) {
                resizeCanvas = targetCanvas;
            } else {
                resizeCanvas = createCanvas(size);
            }
            this.resizeCanvasses.push(resizeCanvas);
        }
    }

    draw() {
        let size = this.size;
        for (let i = 0; i < this.resizeCanvasses.length; i++) {
            const targetSize = i == this.resizeCanvasses.length - 1 ? this.targetSize : size / 2;
            this.resizeCanvasses[i].getContext('2d').drawImage(i == 0 ? this.canvas : this.resizeCanvasses[i - 1], 0, 0, size, size, 0, 0, targetSize, targetSize);
            size /= 2;
        }
    }
}

function atou(b64) {
    return decodeURIComponent(escape(atob(b64)));
}

function utoa(data) {
    data = data.replace(/[\x00-\x1F\x7F]/g, '');
    ;
    return btoa(unescape(encodeURIComponent(data))).replace(/=/g, '');
}


function componentToHex(c) {
    return Math.round(c).toString(16).padStart(2, '0');
}

function rgbToHex(c) {
    return "#" + componentToHex(c[0] * 255) + componentToHex(c[1] * 255) + componentToHex(c[2] * 255);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        (parseInt(result[1], 16) / 255).toFixed(3),
        (parseInt(result[2], 16) / 255).toFixed(3),
        (parseInt(result[3], 16) / 255).toFixed(3)
    ] : [0, 0, 0];
}


function escapeVarName(s) {
    return s.replace(/[^a-z0-9_]/gi)
}

function escapeVarValue(t) {
    if (t.type === 'text') {
        return t.value;
    } else {
        let s = t.value;
        if (Array.isArray(s)) {
            return s.map(e => Math.max(0, Math.min(1, parseFloat(e))));
        } else if (s.toString().includes('M')) {
            s = s.replace(/%20/g, ' ');
            s = s.replace(/\$/g, ' ');
            const rePath = /^([\.\+\-0-9CML,;\s]+)$/gmi; // turtletoy SVG path
            return s.match(rePath) ? s.replace(/;/g, ',') : 'M0,0';
        } else if (s.toString().indexOf(',') > 0) { // color
            return s.toString().split(',').map(e => Math.max(0, Math.min(1, parseFloat(e))));
        } else {
            return parseFloat(s);
        }
    }
}

function escapeHashVarToVar(i) {
    let s = i.replace(/%20/g, ' ');
    s = s.replace(/\$/g, ' ');
    s = s.replace(/;/g, ',');
    return s.at(0) === '@' ? atou(i.substr(1)) : s;
}

function escapeVarToHashVar(t) {
    const s = t.input.value.toString().replace(/,/g, ';').replace(/ /g, '$').replace(/\n/g, '');
    return t.type === 'text' ? `@${utoa(t.input.value.toString())}` : s;
}

function tools_lerp(a, b, t) {
    return (b - a) * t + a;
}

function tools_clamp(a, b, t) {
    return Math.max(a, Math.min(b, t));
}

function randomCoord() {
    return [(90 - Math.random() * 180) | 0, (90 - Math.random() * 180) | 0];
}

function randomVar(t) {
    if (t.type === 'color') {
        t.input.value = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    } else if (t.type === 'path') {
        const p = () => randomCoord().join(',');
        const path = `M${p()}C${p()} ${p()} ${p()}`;
        t.input.value = path;
    } else if (t.type === 'text') {
        t.input.value = Math.random().toString(36).substring(2);
    } else {
        const min = parseFloat(t.min);
        const max = parseFloat(t.max);
        const step = parseFloat(t.step);
        if (step > 0) {
            const steps = Math.max(1, Math.ceil((max - min) / step));
            let l = tools_lerp(min, max, Math.round(Math.random() * steps) / steps);
            if (Math.round(step) === step) {
                l = Math.round(l);
            }
            const value = tools_clamp(l, min, max);
            t.input.value = value;
        } else {
            t.input.value = tools_clamp(tools_lerp(min, max, Math.random()), min, max);
        }
    }
    t.input.dispatchEvent(new Event('change'));
}

function followToggle(follow, userid) {
    $.ajax({
        type: "POST",
        url: follow ? ("./user/follow/" + userid) : ("./user/unfollow/" + userid),
    }).done((data) => {
        if (!data.success) {
            showAlert('Follow', 'Please <a href="./user/login/">log in</a> to follow other users.');
        } else {
            if (data.followed) {
                $('.followUser[data-userid="' + userid + '"]').addClass('d-none');
                $('.unfollowUser[data-userid="' + userid + '"]').removeClass('d-none');
            } else {
                $('.followUser[data-userid="' + userid + '"]').removeClass('d-none');
                $('.unfollowUser[data-userid="' + userid + '"]').addClass('d-none');
            }
        }
    }).fail(() => {
    });
}

function hideShowCommentToggle(show, commentid) {
    $.ajax({
        type: "POST",
        url: show ? ("./comment/show/" + commentid) : ("./comment/hide/" + commentid),
    }).done(() => {
        refreshComments();
    }).fail(() => {
    });
}

function initCommentContextMenuButtons(root) {
    $(root).find('.showComment').click(e => {
        hideShowCommentToggle(true, $(e.currentTarget).attr('data-commentid'));
    });
    $(root).find('.hideComment').click(e => {
        hideShowCommentToggle(false, $(e.currentTarget).attr('data-commentid'));
    });
    $(root).find('.deleteComment').click(e => {
        showConfirm('Delete Comment', 'Are you sure you want to delete this comment?', () => {
            $.ajax({
                type: "DELETE",
                url: "./comment/delete/" + $(e.currentTarget).attr('data-commentid'),
            }).done(data => {
                refreshComments();
                if (!data.success) {
                    showAlert('Delete Comment', 'Please <a href="./user/login/">log in</a> to delete this comment.<br /><br />After you have posted a comment, you can edit or delete it within one hour.');
                }
            }).fail(() => {
            });
        });
    });
    $(root).find('.editComment').click(e => {
        const commentid = $(e.currentTarget).attr('data-commentid');
        $.ajax({
            type: "GET",
            url: "./comment/" + commentid,
        }).done(data => {
            if (data.comment) {
                showConfirm('Edit Comment', '<textarea maxlength="600" placeholder="Your comment.">' + data.comment.comment + '</textarea>', () => {
                    const comment = $('#confirmModal textarea').val();
                    if (!comment) {
                        showAlert('Comment', 'You can not post an empty comment.');
                    } else {
                        const formData = new FormData();
                        formData.append('comment', comment);
                        $.ajax({
                            type: "POST",
                            data: formData,
                            processData: false,
                            contentType: false,
                            url: "./comment/update/" + commentid,
                        }).done((data) => {
                            if (!data.success) {
                                showAlert('Update Failed', 'Please <a href="./user/login/">log in</a> to update this comment.<br /><br />After you have posted a comment, you can edit or delete it within one hour.');
                            }
                            refreshComments();
                        }).fail(() => {
                            refreshComments();
                        });
                    }
                });
            }
        }).fail(() => {
        });
    });
}

function initFollowButtons(root) {
    $(root).find('.followUser').click(e => {
        followToggle(true, $(e.currentTarget).attr('data-userid'));
    });

    $(root).find('.unfollowUser').click(e => {
        const userid = $(e.currentTarget).attr('data-userid');
        showConfirm('Unfollow ' + userid, 'Are you sure you want to unfollow ' + userid + '?', () => {
            followToggle(false, userid);
        });
    });

    $(root).find('.following').mouseenter(e => {
        const button = $(e.currentTarget);
        button.html('Unfollow');
        button.removeClass('btn-outline-succes');
        button.addClass('btn-outline-danger');
    });

    $(root).find('.following').mouseleave(e => {
        const button = $(e.currentTarget);
        button.html('Following');
        button.addClass('btn-outline-succes');
        button.removeClass('btn-outline-danger');
    });
}

function initComments() {
    $('#commentPostButton').click((e) => {
        const commentButton = $('#commentPostButton');
        const comment = $('#objectComment').val();
        if (!comment) {
            showAlert('Comment', 'You can not post an empty comment.');
        } else {
            commentButton.prop('disabled', true);
            const formData = new FormData();
            formData.append('comment', $('#objectComment').val());
            $.ajax({
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                url: "./turtle/comment/" + commentButton.attr('data-objectid'),
            }).done((data) => {
                if (data.success) {
                    $('#objectComment').val('');
                    flashBorder('#objectComment', COLOR_GREEN);
                    refreshComments();
                } else {
                    flashBorder('#objectComment', COLOR_RED);
                }
                commentButton.prop('disabled', false);
            }).fail(() => {
                flashBorder('#objectComment', COLOR_RED);
                commentButton.prop('disabled', false);
            });
        }
    });

    refreshComments();
}

function initLikes() {
    $('.social_like').click((e) => {
        const element = $(e.currentTarget);
        if (element.hasClass('icon-selected')) {
            element.removeClass('icon-selected');
        } else {
            element.addClass('icon-selected');
        }
        $.ajax({
            type: "GET",
            url: "./turtle/toggle_like/" + element.attr('data-objectid'),
        }).done((data) => {
            const likes = data.likes;
            const liked = data.liked;
            element.find('span').last().html(likes);
            if (liked) {
                element.addClass('icon-selected');
            } else {
                element.removeClass('icon-selected');
            }
            if (!data.success) {
                showAlert('Like', 'Please <a href="./user/login/">log in</a> to like this turtle.<br />You can not like your own turtle.');
            }
        });
    });
}

function licenseText(fullName, url) {
    return `<p class="alert alert-secondary" role="alert">This turtle is  licensed under the <a href="${url}" target="_blank" title="${fullName}">${fullName}</a>.</p>
    <p>Before using it, ensure you read and understand the license and respect its terms. Give the original author credits if needed!</p>`;
}

function showLicense(shortName, fullName, url) {
    showAlert(`${shortName} License`, licenseText(fullName, url));
}

async function userLoggedInCheck() {
    return new Promise(resolve => {
        $.ajax({
            type: "GET",
            url: "./user/logged_in/",
        }).done((data) => {
            if (data.success) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).fail(() => {
            resolve(false);
        });
    });
}

$(document).ready(() => {
    initLikes();
    initFollowButtons(document.body);
    initComments();

    if (!isMobile()) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    $(".clickable-row").click(function () {
        window.location = './turtle/' + $(this).data("href");
    });

    $('#shareButton').click(() => {
        $("#shareModal").modal('show');
    });

    $('.diff-show-code').click(e => {
        const target = $(e.currentTarget);
        target.hide("slow");
        target.find('+ *').show("slow");
    });
});

function showAdjustableVariablesAlert() {
	$('#confirmModal').first().modal('hide');
	showAlert('Adjustable variables', 'You can create <em>adjustable variables</em> for your turtle by adding the following comment after the declaration of a variable:<br /><br />' +
	'<code>let name = xxx; // min=xxx, max=xxx, step=xxx</code><br/><br/>' +
	'If one or more adjustable variables are defined, a block with input elements becomes visible below your turtle .<br /><br />Please read the <a href="./syntax#adjustable-variables">documentation</a> for more information.', 'info');
}