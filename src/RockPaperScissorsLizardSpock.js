/**
 * Created by nicolas on 05/05/2016.
 */
var handRock = function () {
    this.slug = 'rock';
    this.name = 'Pierre';
    this.icon = '';
    this.winningCombinations = ['scissors', 'lizard'];
    this.img = 'rock.png'
};

var handPaper = function () {
    this.slug = 'paper';
    this.name = 'Papier';
    this.icon = '';
    this.winningCombinations = ['rock', 'spock'];
    this.img = 'paper.png'
};

var handScissors = function () {
    this.slug = 'scissors';
    this.name = 'Scisso';
    this.icon = '';
    this.winningCombinations = ['paper', 'lizard'];
    this.img = 'scissors.png'
};

var handLizard = function () {
    this.slug = 'lizard';
    this.name = 'lizard';
    this.icon = '';
    this.winningCombinations = ['paper', 'spock'];
    this.img = 'lizard.png'
};

var handSpock = function () {
    this.slug = 'spock';
    this.name = 'spock';
    this.icon = '';
    this.winningCombinations = ['scissors', 'rock'];
    this.img = 'spock.png'
};

/**
 * GameRockPaperScissors
 * @type {{__construct}}
 */
var GameRockPaperScissors = function () {

    const STATUS_WINNER_PLAYER_ONE = 1;
    const STATUS_WINNER_PLAYER_TWO = 2;
    const STATUS_TIE = 3;

    var _opt = {};
    var _winPlayerOne = 0;
    var _winPlayerTwo = 0;
    var _ties = 0;
    var _historyRound = [];
    var _nbRound = 0;
    var _winningCombinations = {};

    /**
     * change dom image player
     * @param hand
     * @param selector
     * @private
     */
    var _changeImgByHand = function (hand, selector) {
        $(selector).attr('src', _opt.pathImg + hand.img)
    };

    /**
     * update dom History round
     * @param status
     * @param handPlayerOne
     * @param handPlayerTwo
     * @private
     */
    var _updateHistoryRound = function (status, handPlayerOne, handPlayerTwo) {
        var html = '<tr>';
        html += '<td class="td-player-one">';
        html += '<img src="' + _opt.pathImg + handPlayerOne.img + '" />';
        html += (status === STATUS_WINNER_PLAYER_ONE) ? ' <span class="label label-success">' + _opt.lang.winner + '</span> ' : '';
        html += '</td>';
        html += '<td class="td-round">';
        html += _opt.lang.roundNumber + ' ' + _nbRound;
        html += (status === STATUS_TIE) ? ' <span class="label label-warning">' + _opt.lang.tie + '</span> ' : '';
        html += '</td>';
        html += '<td class="td-player-two">';
        html += (status === STATUS_WINNER_PLAYER_TWO) ? ' <span class="label label-success">' + _opt.lang.winner + '</span> ' : '';
        html += '<img src="' + _opt.pathImg + handPlayerTwo.img + '" />';
        html += '</td>';
        html += '</tr>';
        $(_opt.selectorTableHistoryRound + ' table').append(html)


        //TODO ADD _historyRound[] => save in database
    };

    /**
     * simulate move
     * @returns {boolean}
     * @private
     */
    var _simulateMove = function () {

        var i = 0;
        var min = 0;
        var max = _opt.Hands.length;
        var render = (Math.floor((max-min)*Math.random())+min);
console.log(render);
        var hand = false;
        $.each(_opt.Hands, function (key, value) {
            if (i === render) {
                hand = _opt.Hands[key];
                return false; // break each
            }
            i++;
        });

        if (false === hand) {
            //TODO EXCEPTION BUG
        }

        return hand;
    };

    /**
     * move by hand
     * @param handSelectedSlug
     * @returns {boolean}
     * @private
     */
    var _moveByHand = function (handSelectedSlug) {
        var hand = false;
        $.each(_opt.Hands, function (key, value) {
            if (value.slug === handSelectedSlug) {
                hand = _opt.Hands[key];
                return false; // break each
            }
        });
        if (false === hand) {

        }

        return hand;
    };

    /**
     * update dom score number tie
     * @private
     */
    var _upadateScoreTie = function () {
        _ties++;
        $(_opt.selectorContentTies).show("slow");
        $(_opt.selectorScoreTies).html(_ties);
    };

    /**
     * update dom score winner player one
     * @private
     */
    var _upadateScoreWinPlayerTwo = function () {
        $(_opt.selectorWinnerPlayerTwo).show("slow");
        _winPlayerTwo++;
        $(_opt.selectorScorePlayerTwo).html(_winPlayerTwo);
    };

    /**
     * update dom score winner player two
     * @private
     */
    var _upadateScoreWinPlayerOne = function () {
        $(_opt.selectorWinnerPlayerOne).show("slow");
        _winPlayerOne++;
        $(_opt.selectorScorePlayerOne).html(_winPlayerOne);
    };

    /**
     * event click btn play Game
     * @private
     */
    var _handlerEventBtnPlayGame = function () {
        $(_opt.selectorClassBtnPlayGame).on('click', function () {

            //initialize data
            _winPlayerOne = 0;
            _winPlayerTwo = 0;
            _ties = 0;
            _historyRound = [];
            _nbRound = 0;

            $(_opt.selectorClassWinnerPlayer).hide();
            $(_opt.selectorScoreTies).html(_ties);
            $(_opt.selectorScorePlayerTwo).html(_winPlayerTwo);
            $(_opt.selectorScorePlayerOne).html(_winPlayerOne);
            $(_opt.selectorImgPlayerTwo).attr('src', _opt.pathImg + _opt.defaultImg);
            $(_opt.selectorImgPlayerOne).attr('src', _opt.pathImg + _opt.defaultImg);
            $(_opt.selectorNbRound).html(_opt.lang.roundNumber + ' ' + _nbRound);
            $(_opt.selectorTableHistoryRound + ' table').find('tr').remove();
        })
    };

    /**
     * event btn select hand player one
     * @private
     */
    var _handlerEventBtnSelect = function () {

        $(_opt.selectorClassBtnHand).on('click', function () {

            $(_opt.selectorClassWinnerPlayer).hide();
            //player one choise
            var handPlayerOne;
            if ($(this).hasClass(_opt.selectorClassBtnSimulateMove.substring(1))) {
                handPlayerOne = _simulateMove()
            } else {
                handPlayerOne = _moveByHand($(this).attr('data-hand'));
            }

            //player two choise
            var handPlayerTwo = _simulateMove();

            var status = _checkChoice(handPlayerOne, handPlayerTwo);

            _newRound();

            _updateHistoryRound(status, handPlayerOne, handPlayerTwo);

            return false;
        })
    };

    /**
     * check choise hand
     * @param handPlayerOne
     * @param handPlayerTwo
     * @returns {boolean}
     * @private
     */
    var _checkChoice = function (handPlayerOne, handPlayerTwo) {

        _changeImgByHand(handPlayerOne, _opt.selectorImgPlayerOne);
        _changeImgByHand(handPlayerTwo, _opt.selectorImgPlayerTwo);

        var status = false;
        if (handPlayerOne == handPlayerTwo) {
            _upadateScoreTie();
            status = STATUS_TIE;
        }
        else {
            $.each(_winningCombinations[handPlayerOne.slug], function (key, valueCombinations) {
                if (valueCombinations === handPlayerTwo.slug) {
                    //PlayerOne Winner
                    _upadateScoreWinPlayerOne();
                    status = STATUS_WINNER_PLAYER_ONE;
                    return false;
                }
            });

            if (false === status) {
                //PlayerTwo Winner
                _upadateScoreWinPlayerTwo();
                status = STATUS_WINNER_PLAYER_TWO;
            }
        }

        if ($.isFunction(_opt.success)) {
            _opt.success(status);
        }

        return status;
    };

    /**
     * add new round
     * @private
     */
    var _newRound = function () {
        _nbRound++;
        $(_opt.selectorNbRound).html(_opt.lang.roundNumber + ' ' + _nbRound)
    };

    return {
        //main function to initiate the module
        __construct: function (options) {

            _opt = $.extend(true, {
                selectorClassBtnPlayGame: '#rpc-btn-play-game',
                selectorContainBtnHand: '#rpc-contain-btn-hands',
                selectorClassBtnHand: '.rpc-btn-hand',
                selectorClassBtnSimulateMove: '.rpc-btn-simulate-move',
                selectorNbRound: '#rpc-round-current',
                selectorScoreTies: '#rpc-score-ties',
                selectorScorePlayerOne: '#rpc-score-player-one',
                selectorScorePlayerTwo: '#rpc-score-player-two',
                selectorImgPlayerOne: '#rpc-img-player-one',
                selectorImgPlayerTwo: '#rpc-img-player-two',
                selectorWinnerPlayerOne: '#rpc-winner-player-one',
                selectorWinnerPlayerTwo: '#rpc-winner-player-two',
                selectorClassWinnerPlayer: '.rpc-winner-player',
                selectorContentTies: '#rpc-content-ties',
                selectorTableHistoryRound: '#rpc-table-history',
                pathImg: 'img/',
                defaultImg: 'quest.png',
                classBtnHand: 'btn btn-default btn-block',
                classBtnHandSimulate: 'btn btn-primary btn-block',
                lang: {
                    roundNumber: 'Round',
                    btnSimulateMove: '<span class="glyphicon glyphicon-refresh" ></span>',
                    winner: 'winner',
                    tie: 'tie'
                },
                Hands: [
                    new handRock(),
                    new handPaper(),
                    new handScissors()
                ]
            }, options);

            $.each(_opt.Hands, function (key, value) {
                _winningCombinations[value.slug] = $.extend({}, value.winningCombinations);
            });

            var html = '';
            $.each(_opt.Hands, function (key, value) {
                html += '<button data-hand="' + value.slug + '" class="' + _opt.classBtnHand + ' ' + _opt.selectorClassBtnHand.substring(1) + '">' + value.name + '</button>';
            });
            html += '<button  class="' + _opt.classBtnHandSimulate + ' ' + _opt.selectorClassBtnHand.substring(1) + ' ' + _opt.selectorClassBtnSimulateMove.substring(1) + '">' + _opt.lang.btnSimulateMove + '</button>';

            $(_opt.selectorContainBtnHand).html(html);

            _handlerEventBtnSelect();

            _handlerEventBtnPlayGame();

            return this;
        }
    }
}();

/**
 * GameRockPaperScissorsLizardSpock
 * @type {{__construct}}
 */
var GameRockPaperScissorsLizardSpock = function () {

    var _opt = {};

    return {
        //main function to initiate the module
        __construct: function (options) {
            _opt = $.extend(true, {
                Hands: [
                    new handRock(),
                    new handPaper(),
                    new handScissors(),
                    new handLizard(),
                    new handSpock()
                ]
            }, options);

            GameRockPaperScissors.__construct(_opt)

            return this;
        }
    }
}();