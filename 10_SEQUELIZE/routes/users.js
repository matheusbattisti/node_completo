// 4 - criando usuários
const express = require("express");
const router = express.Router();
const { User, Role } = require("../models/user");

// 6 - busca de usuarios
const { Op } = require("sequelize");

// 11 - adicionando dado relacionado
// importar no Model de usuarios

// router.post("/", (req, res) => {
//   const { name, salary, profession, is_working } = req.body;

//   User.create({
//     name,
//     salary,
//     profession,
//     is_working,
//   })
//     .then((user) => {
//       res.status(201).json(user);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({ message: "Erro ao criar usuário" });
//     });
// });

// 11 - adicionando dado relacionado
router.post("/", (req, res) => {
  const { name, salary, profession, working, RoleId } = req.body;

  Role.findByPk(RoleId)
    .then((role) => {
      if (role) {
        User.create({ name, salary, profession, working, RoleId })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Erro ao criar usuário" });
          });
      } else {
        res.status(404).json({ message: "Role não encontrada" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar role" });
    });
});

// 5 - resgatando usuarios
router.get("/", (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar usuários" });
    });
});

// 6 - busca de usuarios
router.get("/search", (req, res) => {
  const { name } = req.query;

  if (name) {
    User.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Erro ao buscar usuários" });
      });
  } else {
    res.status(400).json({ message: 'O parâmetro "name" é obrigatório' });
  }
});

// 7 - utilizando o WHERE
router.get("/:id", (req, res) => {
  const id = req.params.id;

  User.findOne({
    where: {
      id: id,
    },
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar usuário" });
    });
});

// 8 - removendo usuarios
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: {
      id: id,
    },
  })
    .then((numDeleted) => {
      if (numDeleted === 1) {
        res.status(200).json({ message: "Usuário deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar usuário" });
    });
});

// 9 - atualizacao de dados
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, salary, profession, working } = req.body;

  User.update(
    { name, salary, profession, working },
    {
      where: {
        id: id,
      },
    }
  )
    .then((numUpdated) => {
      if (numUpdated[0] === 1) {
        res.status(200).json({ message: "Usuário atualizado com sucesso" });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    });
});

// 12 - user com role
router.get("/:id/role", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: Role,
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao buscar usuário" });
  }
});

module.exports = router;
