const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'Li-@-7n+mi/[MYb9,yp+YE4K4EMhD!92xW-+@BpSG;M+=-cNB,W:&6u+8!Pu]bD=[Qz7FNY;$_HzZSd#}@TF*]Pe:XwKZ%e)Xc[pDTdMWiVgS)]fRzSK9;F#i{(:ZWm:]&$?VQme@jzkaZ7e7VZK;MaUZSUgN6rUT;]!ZJViMNW;h{-$P&bQ{c].9tk:Aa:i57$@@#_uBXR)fyr(E4#c%[{i}rp2Yz#cG$9bm;WJzfaPK_.U8V]b!A/%E{CqqRH-xhg{=b.=:bJ]}9U$]B%C{xwQUgeKK%b+&664Vihn+C4+');
        const userId = decodedToken.userId;
        if(req.body.userID && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    }catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !'});
    }
};