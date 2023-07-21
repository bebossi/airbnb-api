"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingController = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var ListingController = /** @class */ (function () {
    function ListingController() {
    }
    ListingController.prototype.createListing = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentUserId, _b, title, description, image, category, roomCount, bathroomCount, guestCount, location, price, listing, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        currentUserId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                        _b = req.body, title = _b.title, description = _b.description, image = _b.image, category = _b.category, roomCount = _b.roomCount, bathroomCount = _b.bathroomCount, guestCount = _b.guestCount, location = _b.location, price = _b.price;
                        return [4 /*yield*/, prisma.listing.create({
                                data: {
                                    title: title,
                                    description: description,
                                    image: image,
                                    category: category,
                                    roomCount: roomCount,
                                    bathroomCount: bathroomCount,
                                    guestCount: guestCount,
                                    locationValue: location.value,
                                    userId: currentUserId,
                                    price: parseInt(price, 10),
                                },
                            })];
                    case 1:
                        listing = _c.sent();
                        return [2 /*return*/, res.status(200).json(listing)];
                    case 2:
                        err_1 = _c.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ListingController.prototype.getListings = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var listings, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.listing.findMany({
                                orderBy: {
                                    createdAt: "desc",
                                },
                            })];
                    case 1:
                        listings = _a.sent();
                        return [2 /*return*/, res.status(200).json(listings)];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ListingController.prototype.getListing = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var listingId, listing, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        listingId = req.params.listingId;
                        return [4 /*yield*/, prisma.listing.findUnique({
                                where: {
                                    id: Number(listingId),
                                },
                                include: {
                                    user: true,
                                },
                            })];
                    case 1:
                        listing = _a.sent();
                        return [2 /*return*/, res.status(200).json(listing)];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ListingController.prototype.getFavoriteListings = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentUserId, currentUser, favorites, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        currentUserId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                        return [4 /*yield*/, prisma.user.findUnique({
                                where: { id: currentUserId },
                            })];
                    case 1:
                        currentUser = _b.sent();
                        return [4 /*yield*/, prisma.listing.findMany({
                                where: {
                                    id: {
                                        in: __spreadArray([], ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.favoriteIds) || []), true),
                                    },
                                },
                            })];
                    case 2:
                        favorites = _b.sent();
                        return [2 /*return*/, res.status(200).json(favorites)];
                    case 3:
                        err_2 = _b.sent();
                        console.error(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ListingController.prototype.getProperties = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentUserId, listings, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        currentUserId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                        return [4 /*yield*/, prisma.listing.findMany({
                                where: {
                                    userId: currentUserId,
                                },
                            })];
                    case 1:
                        listings = _b.sent();
                        return [2 /*return*/, res.status(200).json(listings)];
                    case 2:
                        err_3 = _b.sent();
                        console.error(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ListingController.prototype.deleteListing = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentUserId, listingId, listing, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        currentUserId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                        listingId = req.params.listingId;
                        if (!currentUserId) {
                            return [2 /*return*/, res.status(404).json("Error")];
                        }
                        return [4 /*yield*/, prisma.listing.deleteMany({
                                where: {
                                    id: Number(listingId),
                                    userId: currentUserId,
                                },
                            })];
                    case 1:
                        listing = _b.sent();
                        return [2 /*return*/, res.status(200).json(listing)];
                    case 2:
                        err_4 = _b.sent();
                        console.error(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ListingController.prototype.searchingListing = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentUserId, _b, roomCount, userId, guestCount, bathroomCount, locationValue, startDate, endDate, category, query, listings, err_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        currentUserId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
                        _b = req.query, roomCount = _b.roomCount, userId = _b.userId, guestCount = _b.guestCount, bathroomCount = _b.bathroomCount, locationValue = _b.locationValue, startDate = _b.startDate, endDate = _b.endDate, category = _b.category;
                        query = {};
                        if (userId)
                            query.userId = userId;
                        if (guestCount)
                            query.guestCount = { gte: +guestCount };
                        if (roomCount)
                            query.roomCount = { gte: +roomCount };
                        if (bathroomCount)
                            query.bathroomCount = { gte: +bathroomCount };
                        if (locationValue)
                            query.locationValue = locationValue;
                        if (startDate && endDate) {
                            query.NOT = {
                                reservations: {
                                    some: {
                                        OR: [
                                            {
                                                endDate: { gte: startDate },
                                                startDate: { lte: startDate },
                                            },
                                            {
                                                startDate: { lte: endDate },
                                                endDate: { gte: endDate },
                                            },
                                        ],
                                    },
                                },
                            };
                        }
                        if (category)
                            query.category = category;
                        return [4 /*yield*/, prisma.listing.findMany({
                                where: query,
                                orderBy: {
                                    createdAt: "desc",
                                },
                            })];
                    case 1:
                        listings = _c.sent();
                        return [2 /*return*/, res.status(200).json(listings)];
                    case 2:
                        err_5 = _c.sent();
                        console.error(err_5);
                        return [2 /*return*/, res.status(500).json(err_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ListingController;
}());
exports.ListingController = ListingController;
