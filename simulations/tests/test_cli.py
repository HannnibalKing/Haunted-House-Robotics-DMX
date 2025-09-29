from haunted_sim import SCENARIOS, Step, main
from haunted_sim.cli import main as cli_main


def test_scenarios_exported():
    assert {"skeleton", "ghost", "app"}.issubset(SCENARIOS.keys())
    assert isinstance(next(iter(SCENARIOS["skeleton"])), Step)


def test_cli_instant_mode(capsys):
    exit_code = cli_main(["skeleton", "--instant"])
    captured = capsys.readouterr()
    assert exit_code == 0
    assert "SKELETON SEQUENCE" in captured.out
    assert "M29" in captured.out


def test_module_shim_invokes_cli(capsys):
    exit_code = main(["app", "--instant"])
    captured = capsys.readouterr()
    assert exit_code == 0
    assert "APP SEQUENCE" in captured.out
