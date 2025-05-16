"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitMigration1747365345669 = void 0;
class InitMigration1747365345669 {
    constructor() {
        this.name = 'InitMigration1747365345669';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."dish_category_enum" AS ENUM('entrada', 'plato fuerte', 'postre', 'bebida')`);
        await queryRunner.query(`CREATE TABLE "dish" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "category" "public"."dish_category_enum" NOT NULL, CONSTRAINT "PK_59ac7b35af39b231276bfc4c00c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."restaurant_cuisinetype_enum" AS ENUM('Italiana', 'Japonesa', 'Mexicana', 'Colombiana', 'India', 'Internacional')`);
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "cuisineType" "public"."restaurant_cuisinetype_enum" NOT NULL, "website" character varying NOT NULL, CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurant_dishes_dish" ("restaurantId" integer NOT NULL, "dishId" integer NOT NULL, CONSTRAINT "PK_4064aaec23cd5f87026a6d50f4b" PRIMARY KEY ("restaurantId", "dishId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0206b7accb37155a656865c46e" ON "restaurant_dishes_dish" ("restaurantId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fa15949e9fe24ece4725d90e43" ON "restaurant_dishes_dish" ("dishId") `);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes_dish" ADD CONSTRAINT "FK_0206b7accb37155a656865c46e3" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes_dish" ADD CONSTRAINT "FK_fa15949e9fe24ece4725d90e43b" FOREIGN KEY ("dishId") REFERENCES "dish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "restaurant_dishes_dish" DROP CONSTRAINT "FK_fa15949e9fe24ece4725d90e43b"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes_dish" DROP CONSTRAINT "FK_0206b7accb37155a656865c46e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa15949e9fe24ece4725d90e43"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0206b7accb37155a656865c46e"`);
        await queryRunner.query(`DROP TABLE "restaurant_dishes_dish"`);
        await queryRunner.query(`DROP TABLE "restaurant"`);
        await queryRunner.query(`DROP TYPE "public"."restaurant_cuisinetype_enum"`);
        await queryRunner.query(`DROP TABLE "dish"`);
        await queryRunner.query(`DROP TYPE "public"."dish_category_enum"`);
    }
}
exports.InitMigration1747365345669 = InitMigration1747365345669;
//# sourceMappingURL=1747365345669-InitMigration.js.map