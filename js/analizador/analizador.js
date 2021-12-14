/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var analizador = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,6],$V2=[5,31,33],$V3=[1,12],$V4=[1,13],$V5=[1,14],$V6=[1,15],$V7=[1,16],$V8=[1,17],$V9=[1,18],$Va=[1,19],$Vb=[1,22],$Vc=[1,23],$Vd=[1,24],$Ve=[1,25],$Vf=[1,26],$Vg=[1,27],$Vh=[1,30],$Vi=[1,28],$Vj=[1,29],$Vk=[1,31],$Vl=[1,32],$Vm=[1,33],$Vn=[1,34],$Vo=[1,35],$Vp=[10,11,12,13,14,15,17,18,19,20,21,22,23,24,25],$Vq=[10,11,12,13,14,15,17,18,20,21,22,23,24,25],$Vr=[17,24,25],$Vs=[10,11,12,13,14,15,17,24,25],$Vt=[10,11,12,13,14,15,17,18,20,24,25];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"init":3,"completo":4,"EOF":5,"global":6,"imprimir":7,"expresion":8,"CADENA":9,"IGUALDAD":10,"DIFERENTE":11,"MAYOR":12,"MENOR":13,"MAYORIGUAL":14,"MENORIGUAL":15,"PARIZQ":16,"PARDER":17,"MENOS":18,"CONCATENACION":19,"MAS":20,"POR":21,"DIVIDIDO":22,"MODULO":23,"AND":24,"OR":25,"NOT":26,"ENTERO":27,"DECIMAL":28,"TRUE":29,"FALSE":30,"PRINT":31,"PTCOMA":32,"PRINTLN":33,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",9:"CADENA",10:"IGUALDAD",11:"DIFERENTE",12:"MAYOR",13:"MENOR",14:"MAYORIGUAL",15:"MENORIGUAL",16:"PARIZQ",17:"PARDER",18:"MENOS",19:"CONCATENACION",20:"MAS",21:"POR",22:"DIVIDIDO",23:"MODULO",24:"AND",25:"OR",26:"NOT",27:"ENTERO",28:"DECIMAL",29:"TRUE",30:"FALSE",31:"PRINT",32:"PTCOMA",33:"PRINTLN"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[8,1],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,2],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,2],[8,1],[8,1],[8,1],[8,1],[7,5],[7,5]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 5:
 this.$ = $$[$0]; 
break;
case 6:
 this.$ = ($$[$0-2] == $$[$0])? true : false; 
break;
case 7:
 this.$ = ($$[$0-2] != $$[$0])? true : false; 
break;
case 8:
 this.$ = ($$[$0-2] > $$[$0])? true : false; 
break;
case 9:
 this.$ = ($$[$0-2] < $$[$0])? true : false; 
break;
case 10:
 this.$ = ($$[$0-2] >= $$[$0])? true : false; 
break;
case 11:
 this.$ = ($$[$0-2] <= $$[$0])? true : false; 
break;
case 12:
 this.$ = $$[$0-1]; 
break;
case 13:
 this.$ = $$[$0] *-1; 
break;
case 14:
 this.$ = ($$[$0-2] + $$[$0]); 
break;
case 15:
 this.$ = $$[$0-2] + $$[$0]; 
break;
case 16:
 this.$ = $$[$0-2] - $$[$0]; 
break;
case 17:
 this.$ = $$[$0-2] * $$[$0]; 
break;
case 18:
 this.$ = $$[$0-2] / $$[$0]; 
break;
case 19:
 this.$ = $$[$0-2] % $$[$0]; 
break;
case 20:
 this.$ = ($$[$0-2] && $$[$0])?true:false; 
break;
case 21:
 this.$ = ($$[$0-2] || $$[$0])?true:false; 
break;
case 22:
 this.$ = ($$[$0-1])?false:true ; 
break;
case 23: case 24:
 this.$ = Number($$[$0]);
break;
case 25:
 this.$ = true; 
break;
case 26:
 this.$ = false; 
break;
case 27:
contenido = contenido+ $$[$0-2]; 
break;
case 28:
contenido = contenido+ $$[$0-2] + "\n"; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,31:$V0,33:$V1},{1:[3]},{5:[1,7],6:8,7:4,31:$V0,33:$V1},o($V2,[2,3]),o($V2,[2,4]),{16:[1,9]},{16:[1,10]},{1:[2,1]},o($V2,[2,2]),{8:11,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:20,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{10:$Vb,11:$Vc,12:$Vd,13:$Ve,14:$Vf,15:$Vg,17:[1,21],18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm,24:$Vn,25:$Vo},o($Vp,[2,5]),{8:36,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:37,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:38,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},o($Vp,[2,23]),o($Vp,[2,24]),o($Vp,[2,25]),o($Vp,[2,26]),{10:$Vb,11:$Vc,12:$Vd,13:$Ve,14:$Vf,15:$Vg,17:[1,39],18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm,24:$Vn,25:$Vo},{32:[1,40]},{8:41,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:42,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:43,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:44,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:45,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:46,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:47,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:48,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:49,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:50,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:51,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:52,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:53,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{8:54,9:$V3,16:$V4,18:$V5,26:$V6,27:$V7,28:$V8,29:$V9,30:$Va},{10:$Vb,11:$Vc,12:$Vd,13:$Ve,14:$Vf,15:$Vg,17:[1,55],18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm,24:$Vn,25:$Vo},o($Vq,[2,13],{19:$Vi}),o($Vr,[2,22],{10:$Vb,11:$Vc,12:$Vd,13:$Ve,14:$Vf,15:$Vg,18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),{32:[1,56]},o($V2,[2,27]),o($Vs,[2,6],{18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vs,[2,7],{18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vs,[2,8],{18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vs,[2,9],{18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vs,[2,10],{18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vs,[2,11],{18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),{10:$Vb,11:$Vc,12:$Vd,13:$Ve,14:$Vf,15:$Vg,17:[2,14],18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm,24:$Vn,25:$Vo},o($Vt,[2,15],{19:$Vi,21:$Vk,22:$Vl,23:$Vm}),o($Vt,[2,16],{19:$Vi,21:$Vk,22:$Vl,23:$Vm}),o($Vq,[2,17],{19:$Vi}),o($Vq,[2,18],{19:$Vi}),o($Vq,[2,19],{19:$Vi}),o($Vr,[2,20],{10:$Vb,11:$Vc,12:$Vd,13:$Ve,14:$Vf,15:$Vg,18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o([17,25],[2,21],{10:$Vb,11:$Vc,12:$Vd,13:$Ve,14:$Vf,15:$Vg,18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm,24:$Vn}),o($Vp,[2,12]),o($V2,[2,28])],
defaultActions: {7:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:
break;
case 1:
break;
case 2:
break;
case 3:
break;
case 4:
break;
case 5:return 10; //igualdad
break;
case 6:return 11; //diferente
break;
case 7:return 14; //mayor igual
break;
case 8:return 15; //menor igual
break;
case 9:return 12; //mayor
break;
case 10:return 13; //menor
break;
case 11:return 32;
break;
case 12:return 16;
break;
case 13:return 17;
break;
case 14:return 'CORIZQ';
break;
case 15:return 'CORDER';
break;
case 16:return 'COMA';
break;
case 17:return 'IGUAL';
break;
case 18:return 'PREGUNTA';
break;
case 19:return 'DOSPTS';
break;
case 20:return 24;
break;
case 21:return 25;
break;
case 22:return 26;
break;
case 23:return 19
break;
case 24:return 'INC';        //Incremento
break;
case 25:return 'DEC';        //Decremento
break;
case 26:return 20;         //Suma
break;
case 27:return 18;         //Resta
break;
case 28:return 21;         //Multipliación
break;
case 29:return 22;         //División
break;
case 30:return 23;         //Módulo
break;
case 31:return 'POW';
break;
case 32:return 'SQRT';
break;
case 33:return 'SIN';
break;
case 34:return 'COS';
break;
case 35:return 'TAN';
break;
case 36:return 31;
break;
case 37:return 33;
break;
case 38:return 'NULL';
break;
case 39:return 'INT';
break;
case 40:return 'DOUBLE';
break;
case 41:return 'BOOLEAN';
break;
case 42:return 'CHAR';
break;
case 43:return 'STRING';
break;
case 44:return 'STRUCT';
break;
case 45: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 9; 
break;
case 46: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 'CARACTER'; 
break;
case 47:return 28;  //Decimal
break;
case 48:return 27;   //Entero
break;
case 49:return 29;     //Verdadero
break;
case 50:return 30;    //Falso
break;
case 51:return 'ID';       //Identificadores
break;
case 52:return 5;
break;
case 53: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:\s+)/,/^(?:[ \r\t]+)/,/^(?:\n)/,/^(?:\/\/.*)/,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/,/^(?:==)/,/^(?:!=)/,/^(?:>=)/,/^(?:<=)/,/^(?:>)/,/^(?:<)/,/^(?:;)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:=)/,/^(?:\?)/,/^(?::)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:&)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:pow\b)/,/^(?:sqrt\b)/,/^(?:sin\b)/,/^(?:cos\b)/,/^(?:tan\b)/,/^(?:print\b)/,/^(?:println\b)/,/^(?:null\b)/,/^(?:int\b)/,/^(?:double\b)/,/^(?:boolean\b)/,/^(?:char\b)/,/^(?:String\b)/,/^(?:struct\b)/,/^(?:"((\\")|[^\"\n])*")/,/^(?:'((\\\\)|(\\n)|(\\t)|(\\")|(\\')|[^\'\n])')/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:[0-9]+\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = analizador;
exports.Parser = analizador.Parser;
exports.parse = function () { return analizador.parse.apply(analizador, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}