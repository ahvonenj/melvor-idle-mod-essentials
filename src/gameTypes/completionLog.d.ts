declare let skillsLogLoaded: boolean;
declare let masteryLogLoaded: boolean;
declare let itemLogLoaded: boolean;
declare let monsterLogLoaded: boolean;
declare let petLogLoaded: boolean;
declare let itemLogPage: number;
declare let compCategory: number;
declare const enum ItemLogFilter {
    ShowAll = 0,
    ShowDiscovered = 1,
    ShowUndiscovered = 2,
    ShowBaseGame = 3,
    ShowTotH = 4
}
/** Callback function for when one of the filter buttons in the item log is clicked */
declare function filterItemLog(filter: ItemLogFilter): void;
/** Callback function for changing which tab of the completion log to view */
declare function showCompletionCategory(category: number): void;
/** @deprecated Unused Callback Function */
declare function changeItemLogPage(page: number): void;
interface CompletionProgressElements {
    parent: HTMLHeadingElement;
    current: HTMLSpanElement;
    total: HTMLSpanElement;
    percent: HTMLSpanElement;
}
interface CompletionLogMenuElements {
    skills: Map<AnySkill, SkillCompletionElement>;
    masterySkills: Map<SkillWithMastery<MasteryAction, MasterySkillData>, MasteryCompletionElement>;
    items: Map<AnyItem, ItemCompletionElement>;
    monsters: Map<Monster, MonsterCompletionElement>;
    pets: Map<Pet, PetCompletionElement>;
    skillProgress: Map<string, CompletionProgressElements>;
    masteryProgress: Map<string, CompletionProgressElements>;
    itemProgress: Map<string, CompletionProgressElements>;
    monsterProgress: Map<string, CompletionProgressElements>;
    petProgress: Map<string, CompletionProgressElements>;
}
declare const completionLogMenu: CompletionLogMenuElements;
declare function buildCompletionProgressElements(container: HTMLElement, langID: string, name: string, classes: string): CompletionProgressElements;
declare function buildCompletionProgress(container: HTMLElement, progress: Map<string, CompletionProgressElements>, totalCategory: string): void;
/** Constructs the interface for the skill log */
declare function buildSkillsLog(game: Game): void;
/** Constructs the interface for the mastery log */
declare function buildMasteryLog(game: Game): void;
/** Callback function for when the item log search bar value is changed */
declare function updateItemLogSearch(query: string): void;
/** Callback function for clearing the item log search bar */
declare function clearItemLogSearch(): void;
/** Constructs the interface for the item log */
declare function buildItemLog(game: Game): void;
/** Constructs the interface for the monsters log */
declare function buildMonsterLog(game: Game): void;
/** Constructs the interface for the pets log */
declare function buildPetLog(game: Game): void;
/** Defines the order in which monster log stat tooltips are displayed */
declare const monsterStatDisplayOrder: MonsterStats[];
/** Formats the item stats of the specified item in the following format:
 *  `${preStat}${statName}${preCount}${statValue}${postStat}`
 */
declare function getItemStatDescriptions(item: AnyItem, preCount: string, preStat: string, postStat: string): string;
/** Formats a progression percentage. Optionally includes the percent sign */
declare function parseProgress(progress: number, withPercent?: boolean): string;
/** Shows a prompt to the player to review the game on the respective platform's store. */
declare function promptGameReview(): void;
declare let itemLogSearch: ItemSearch[];
/** Initializes the item log search array data */
declare function updateItemLogSearchArray(game: Game): void;
declare class SkillCompletionElement extends HTMLElement {
    private _content;
    private viewMilestonesLink;
    private blockContainer;
    private skillImage;
    private skillName;
    private skillProgressFraction;
    private skillProgressBar;
    constructor();
    connectedCallback(): void;
    setSkill(skill: AnySkill): void;
    updateProgress(skill: AnySkill): void;
}
declare class MasteryCompletionElement extends HTMLElement {
    private _content;
    private blockContainer;
    private skillImage;
    private skillName;
    private masteryProgressFraction;
    private masteryProgressPercent;
    private masteryProgressBar;
    private progressButton;
    private unlocksButton;
    constructor();
    connectedCallback(): void;
    setSkill(skill: SkillWithMastery<MasteryAction, MasterySkillData>): void;
    updateProgress(skill: SkillWithMastery<MasteryAction, MasterySkillData>): void;
}
declare class ItemCompletionElement extends HTMLElement {
    private _content;
    private itemImage;
    private tooltip?;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    updateItem(item: AnyItem, game: Game): void;
    private getItemTooltipHTML;
}
declare class MonsterCompletionElement extends HTMLElement {
    private _content;
    private monsterImage;
    private tooltip?;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    updateMonster(monster: Monster, game: Game): void;
    private getMonsterTooltipHTML;
}
declare class PetCompletionElement extends HTMLElement {
    private _content;
    private petImage;
    private tooltip?;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    updatePet(pet: Pet, game: Game): void;
    private getPetTooltipHTML;
}
declare class CompletionMap extends SparseNumericMap<string> {
    getCompValue(namespace: string): number;
}
declare class CompletionRenderQueue {
    items: Set<AnyItem>;
    monsters: Set<Monster>;
    pets: Set<Pet>;
    skills: Set<AnySkill>;
    masterySkills: Set<SkillWithMastery<MasteryAction, MasterySkillData>>;
    totalProgressTrue: boolean;
    totalProgressBaseGame: boolean;
    totalProgressTotH: boolean;
}
declare class CompletionProgress {
    currentCount: CompletionMap;
    maximumCount: CompletionMap;
    get hasNonBaseGame(): boolean;
    getPercent(namespace: string): number;
}
declare const enum CompletionCategory {
    Skills = 0,
    Mastery = 1,
    Items = 2,
    Monsters = 3,
    Pets = 4
}
declare type CompletionNamespace = Namespaces | string;
declare const enum VisibleCompletion {
    True = 0,
    BaseGame = 1,
    TotH = 2
}
declare class Completion implements EncodableObject {
    private game;
    private renderQueue;
    /** Percent progress to maximizing skills */
    skillProgress: CompletionProgress;
    /** Percent progress to maximizing skill mastery */
    masteryProgress: CompletionProgress;
    /** Percent progress to item completion */
    itemProgress: CompletionProgress;
    /** Percent progress to monster completion */
    monsterProgress: CompletionProgress;
    /** Percent progress to pet completion */
    petProgress: CompletionProgress;
    /** Overall progress between all categories */
    totalProgressMap: CompletionMap;
    get totalProgressTrue(): number;
    get totalProgressBaseGame(): number;
    get totalProgressTotH(): number;
    /** The namespace to currently display the completion of */
    visibleCompletion: CompletionNamespace;
    constructor(game: Game);
    encode(writer: SaveWriter): SaveWriter;
    decode(reader: SaveWriter, version: number): void;
    setVisibleCompletion(visibleCompletion: CompletionNamespace): void;
    private updateVisbleCompletionButtons;
    private getSkillProgressPercent;
    private getMasteryProgressPercent;
    private getItemProgressPercent;
    private getMonsterProgressPercent;
    private getPetProgressPercent;
    private updateProgressElements;
    private updateAllProgressElements;
    render(): void;
    /** Runs once when a save file is loaded */
    onLoad(): void;
    /** Upates all completion values, and queues renders for them */
    private updateAllCompletion;
    updateSkill(skill: AnySkill): void;
    updateSkillMastery(skill: SkillWithMastery<MasteryAction, MasterySkillData>): void;
    updateItem(item: AnyItem): void;
    updateMonster(monster: Monster): void;
    updatePet(pet: Pet): void;
    private updateSkillProgress;
    private updateMasteryProgress;
    private updateItemProgress;
    private updateMonsterProgress;
    private updatePetProgress;
    private computeTotalProgressPercent;
    private updateTotalProgress;
}
